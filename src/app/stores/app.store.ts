import { computed, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, withPreloading } from '@angular/router';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { filter, map, tap } from 'rxjs';

type AppState = {
    loading: boolean;
    url: string;
};

const initialState: AppState = {
    loading: false,
    url: '',
};

const ROUTES_WITHOUT_HEADER = ['/signin'];

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        hideLoading: () => patchState(store, { loading: false }),
        showLoading: () => patchState(store, { loading: true }),
        updateURL: (url: string) => patchState(store, { url }),
    })),
    withHooks((store, router = inject(Router)) => ({
        onInit: () => {
            router.events
                .pipe(
                    takeUntilDestroyed(),
                    filter((event) => event instanceof NavigationEnd),
                    map((event) => event as NavigationEnd),
                    tap(({ url }) => patchState(store, { url }))
                )
                .subscribe();
        },
    })),
    withComputed((store, route = inject(ActivatedRoute)) => ({
        isHeaderDisabled: computed(() => {
            return ROUTES_WITHOUT_HEADER.includes(store.url());
        }),
    }))
);
