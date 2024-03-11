import { patchState } from '@ngrx/signals';
import { Query } from '../models/query';

export const queryMethods = (store: any) => ({
    updateQuery(query?: Query) {
        patchState(store, (state: { query: Query }) => ({ query: { ...state.query, ...query } }));
    },
    changePage(direction: -1 | 1) {
        patchState(store, (state: { query: Query }) => ({
            query: { ...state.query, _page: state.query._page + direction },
        }));
    },
});
