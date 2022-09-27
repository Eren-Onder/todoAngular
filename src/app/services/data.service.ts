import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo } from '../interface/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private rootUrl = '/api';
    public $todos: Observable<ToDo[]> | undefined;
    public $todosdone!: Observable<ToDo[]>;

    constructor(
        private _http: HttpClient
    ) {
        this.getGlobalData();
    }

    public getGlobalData(): void {
        this.$todos = this.getToDo();
        this.$todosdone = this.getToDoDone();
    }

    // POST
    public postToDo(object: ToDo): Observable<ToDo> {
        const httpOptions = {
            headers: new HttpHeaders ({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post<ToDo>(`${this.rootUrl}/todo`, object, httpOptions);
    }

    // GET
    public getToDo(): Observable<ToDo[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.get<ToDo[]>(`${this.rootUrl}/todo?status=false`, httpOptions);
    }

    public getToDoDone(): Observable<ToDo[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.get<ToDo[]>(`${this.rootUrl}/todo?status=true`, httpOptions);
    }

    // DELETE
    public deleteToDo(object: ToDo): Observable<ToDo> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.delete<ToDo>(`${this.rootUrl}/todo/${object.id}`, httpOptions);
    }

    // PUT
    public putToDo(object: ToDo): Observable<ToDo> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.put<ToDo>(`${this.rootUrl}/todo/${object.id}`, object, httpOptions);
    }

}