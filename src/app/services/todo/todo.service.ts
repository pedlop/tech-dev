import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Query } from '@models/query';

import { AbstractHttpService } from '../http.service';

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService extends AbstractHttpService {
    constructor() {
        super('todos');
    }

    readAll(query: Query): Observable<Todo[]> {
        const params = this.buildQueryParams(query);
        return this.http.get<Todo[]>(this.baseUrl, { params });
    }
}
