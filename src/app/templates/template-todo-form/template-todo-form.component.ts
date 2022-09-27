import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../interface/todo';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.scss']
})
export class TemplateTodoFormComponent implements OnInit {

    private toDo$: ToDo;
todo$: any;

    constructor(
        public _dataService: DataService
    ) {
        this.toDo$ = {
            label: ``,
            status: false
        };
    }

    ngOnInit() {
    }

    // Create new ToDo
    public createToDo(event: any): void {
        this._dataService.postToDo(this.toDo$).subscribe((data: ToDo) => {
            this._dataService.getGlobalData();
            this.toDo$ = {
                label: ``,
                status: false
            };
        }, error => {
            console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
        });
    }

}