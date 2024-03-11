import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

import { Query } from '../models/query';

@Injectable({ providedIn: 'root' })
export abstract class AbstractHttpService {
    baseUrl: string;
    readonly http = inject(HttpClient);
    private readonly API = 'https://jsonplaceholder.typicode.com';

    constructor(baseUrl: string) {
        this.baseUrl = `${this.API}/${baseUrl}`;
    }

    asPromise<T>(request: Observable<T>): Promise<T> {
        return lastValueFrom(request);
    }

    buildQueryParams(query: Query): HttpParams {
        let params = new HttpParams();
        for (const key of Object.keys(query) as (keyof Query)[]) {
            params = params.set(key, `${query[key]}`);
        }
        return params;
    }
}
