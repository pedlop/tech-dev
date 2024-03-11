import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '@models/user';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { UserService } from '@services/user/user.service';

type UserState = {
    readonly loading: boolean;
    readonly role: UserRole;
    readonly user?: User;
};

const initialState: UserState = {
    loading: false,
    role: 'guest',
    user: undefined,
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, router = inject(Router), userService = inject(UserService)) => ({
        load() {
            const user = userService.check();
            console.log('USER', user);
            patchState(store, { user });
        },
        async signIn(email: string) {
            patchState(store, { loading: true });
            const user = await userService.signIn(email).toPromise();
            await router.navigateByUrl('');
            patchState(store, { loading: false, role: 'user', user });
        },
        async signOut() {
            userService.signOut();
            await router.navigateByUrl('signin');
            patchState(store, { role: 'guest', user: undefined });
        },
    })),
    withHooks({ onInit: (store) => store.load() })
);
