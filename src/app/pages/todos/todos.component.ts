import { Component, OnInit, inject } from '@angular/core';

import { LoadingComponent } from '@components/loading/loading.component';
import { TodosStore } from '@stores/todos.store';

@Component({
    selector: 'td-todos',
    standalone: true,
    templateUrl: './todos.component.html',
    styleUrl: './todos.component.scss',
    imports: [LoadingComponent],
})
export class TodosComponent implements OnInit {
    store = inject(TodosStore);

    async ngOnInit() {
        const query = this.store.query();
        await this.store.loadAll(query);
    }

    onPageChanges(direction: -1 | 1): void {
        this.store.changePage(direction);
    }
}
