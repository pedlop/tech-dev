import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, finalize, pipe, switchMap, tap } from 'rxjs';

import { Post } from '../models/post';
import { PostService } from '../services/post/post.service';
import { Query, initialQuery } from '../models/query';

type PostsState = {
    loading: boolean;
    posts: Post[];
    query: Query;
};

const initialState: PostsState = {
    loading: false,
    posts: [],
    query: initialQuery,
};

export const PostsStore = signalStore(
    withState(initialState),
    withMethods((store, postService = inject(PostService)) => ({
        // async readAll() {
        //     patchState(store, { loading: true });
        //     const posts = await postService.readAll().toPromise();
        //     patchState(store, { loading: false, posts });
        // },
        async createPost(title: string) {
            const post = await postService.create({ title, body: 'bla bla bla', userId: 1 }).toPromise();
            if (!post) throw new Error('Error creating post.');

            const posts = [post, ...store.posts()];
            posts.splice(-1);

            patchState(store, { posts });
        },
        updateQuery(query?: Query) {
            patchState(store, (state) => ({ query: { ...state.query, ...query } }));
        },
        changePage(direction: -1 | 1) {
            patchState(store, (state) => ({ query: { ...state.query, _page: state.query._page + direction } }));
        },
        load: rxMethod<Query>(
            pipe(
                takeUntilDestroyed(),
                tap(() => patchState(store, { loading: true })),
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((page) =>
                    postService.readAll(page).pipe(finalize(() => patchState(store, { loading: false })))
                ),
                tapResponse({ next: (posts) => patchState(store, { posts }), error: (error) => console.error(error) })
            )
        ),
    })),
    withHooks({ onInit: (store) => store.load(store.query), onDestroy: () => console.log('POSTS COMPONENT DESTROYED') })
);
