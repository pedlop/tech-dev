import { queryMethods } from './query.store';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Todo, TodoService } from '../services/todo/todo.service';
import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, debounceTime, finalize, switchMap, tap, timer } from 'rxjs';
import { Query, initialQuery } from '../models/query';

type TodoFilter = 'all' | 'pending' | 'completed';

export interface TodosState {
    filter: TodoFilter;
    loading: boolean;
    todos: Todo[];
    query: Query;
}

const intialState: TodosState = {
    filter: 'all',
    loading: false,
    todos: [],
    query: initialQuery,
};

export const TodosStore = signalStore(
    { providedIn: 'root' },
    withState(intialState),
    withMethods((store, todoService = inject(TodoService)) => ({
        ...queryMethods(store),
        async loadAll(query: Query) {
            console.log('QUERY', query);
            patchState(store, { loading: true });
            const todos = await todoService.readAll(query).toPromise();
            patchState(store, { loading: false, todos });
        },
    })),
    withComputed((state) => ({
        filteredTodos: computed(() => {
            const todos = state.todos();

            switch (state.filter()) {
                case 'all':
                    return todos;
                case 'pending':
                    return todos.filter((todo) => !todo.completed);
                case 'completed':
                    return todos.filter((todo) => todo.completed);
            }
        }),
    }))

    // withHooks((store) => {
    //     const todoService = inject(TodoService);

    //     return {
    //         onInit() {
    //             console.log('INIT');
    //             patchState(store, { loading: true });
    //             timer(2000)
    //                 .pipe(
    //                     takeUntilDestroyed(),
    //                     switchMap(() =>
    //                         todoService.getAll().pipe(finalize(() => patchState(store, { loading: false })))
    //                     ),
    //                     tap((todos) => patchState(store, { todos }))
    //                 )
    //                 .subscribe();
    //         },
    //         onDestroy() {
    //             console.log('DESTROY');
    //         },
    //     };
    // })
);
