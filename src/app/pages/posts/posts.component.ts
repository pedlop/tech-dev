import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from '@components/loading/loading.component';
import { PostsStore } from '@stores/posts.store';
import { UserStore } from '@stores/user.store';

@Component({
    selector: 'td-posts',
    standalone: true,
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.scss',
    imports: [RouterModule, LoadingComponent],
    providers: [PostsStore],
})
export class PostsComponent {
    store = inject(PostsStore);
    userStore = inject(UserStore);

    onAddPost(title: string): void {
        this.store.createPost(title);
    }

    onPageChanges(direction: -1 | 1): void {
        this.store.changePage(direction);
    }
}
