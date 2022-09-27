import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { ToDo } from '../interface/todo';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit, OnDestroy {
    $todos!: any[];
create($event: Event) {
throw new Error('Method not implemented.');
}
update($event: Event) {
throw new Error('Method not implemented.');
}

    public toDoDoneShow: boolean;
    public toDoShow: boolean;
    public subs = new Subscription();

    constructor(
        public _dataService: DataService,
        private _dragulaService: DragulaService
    ) {
        this.toDoDoneShow = false;
        this.toDoShow = true;

        this._dragulaService.createGroup('todos', {
            removeOnSpill: false,
            moves: function ( handle) {
                return handle?.className === 'handle';
            }
        });

        this.subs.add(_dragulaService.drop('todos')
            .subscribe(({ el }) => {
                this.position();
            })
        );

    }

    

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    
    public position(): void {
        let position = 0;
        this._dataService?.$todos?.subscribe((todos: ToDo[]) => {
            todos.forEach((todo: ToDo) => {
                position += 1;
                todo.position = position;
                this._dataService.putToDo(todo).subscribe((data: ToDo) => {
                }, error => {
                    console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
                });
            });
        });
    }

}