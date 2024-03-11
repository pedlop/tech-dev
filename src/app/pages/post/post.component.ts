import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingComponent } from '@components/loading/loading.component';
import { PostStore } from '@stores/post.store';

@Component({
    selector: 'td-post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    imports: [JsonPipe, LoadingComponent],
})
export class PostComponent implements OnInit {
    readonly store = inject(PostStore);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    async ngOnInit() {
        const { id } = this.route.snapshot.params;
        if (!id) this.router.navigateByUrl('404');
        await this.store.readById(id);
    }
}
