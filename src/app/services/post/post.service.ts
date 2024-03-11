import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Comment } from '@models/comment';
import { Post } from '@models/post';
import { Query } from '@models/query';

import { AbstractHttpService } from '../http.service';

@Injectable({ providedIn: 'root' })
export class PostService extends AbstractHttpService {
    constructor() {
        super('posts');
    }

    create(post: Omit<Post, 'id'>): Observable<Post> {
        return this.http.post<Post>(this.baseUrl, post);
    }

    readAll(query: Query): Observable<Post[]> {
        const params = this.buildQueryParams(query);
        return this.http.get<Post[]>(this.baseUrl, { params });
    }

    readOne(id: number): Observable<Post> {
        return this.http.get<Post>(`${this.baseUrl}/${id}`);
    }

    readCommentsByPostId(postId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.baseUrl}/${postId}/comments`);
    }

    update(id: number, post: Partial<Post>): Observable<Post> {
        return this.http.patch<Post>(`${this.baseUrl}/${id}`, post);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
