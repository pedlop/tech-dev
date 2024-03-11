import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserStore } from '@stores/user.store';

@Component({
    selector: 'td-header',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    userStore = inject(UserStore);

    async onSignOut() {
        await this.userStore.signOut();
    }
}
