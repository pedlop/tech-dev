import { Routes } from '@angular/router';

import { PostsComponent } from './pages/posts/posts.component';
import { PostComponent } from './pages/post/post.component';
import { TodosComponent } from './pages/todos/todos.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InternalErrorComponent } from './pages/internal-error/internal-error.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'posts' },
    { path: 'signin', loadComponent: () => SignInComponent },
    {
        path: 'posts',
        children: [
            { path: '', loadComponent: () => PostsComponent },
            { path: ':id', loadComponent: () => PostComponent },
        ],
    },
    { path: 'todos', component: TodosComponent },
    { path: '500', component: InternalErrorComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' },
];
