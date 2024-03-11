import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppStore } from '@stores/app.store';

import { HeaderComponent } from './components/header/header.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { TodosComponent } from './pages/todos/todos.component';
import { TodoService } from './services/todo/todo.service';

@Component({
    selector: 'td-root',
    standalone: true,
    providers: [TodoService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CommonModule, TodosComponent, HeaderComponent, LoadingBarComponent],
})
export class AppComponent {
    store = inject(AppStore);
}
