import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';

import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { PostService } from '../services/post/post.service';

type PostState = {
    comments: Comment[];
    loading: boolean;
    post?: Post;
};

const initialState: PostState = {
    comments: [],
    loading: false,
    post: undefined,
};

export const PostStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, postService = inject(PostService)) => ({
        async readById(id: number) {
            patchState(store, { loading: true });
            const [post, comments] = await Promise.all([
                lastValueFrom(postService.readOne(id)),
                lastValueFrom(postService.readCommentsByPostId(id)),
            ]);
            patchState(store, { loading: false, comments, post });
        },
    }))
);
