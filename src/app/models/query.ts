export type Query = {
    _embed?: string;
    _sort?: string;
    _start?: number;
    _end?: number;
    _limit?: number;
    _page: number;
    _per_page?: number;
    userId?: number;
};

export const initialQuery: Query = {
    _limit: 15,
    _page: 1,
    _sort: '-id',
};
