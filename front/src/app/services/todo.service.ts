import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, take } from 'rxjs';

export interface Task {
  id: number;
  task: string;
  description: string;
  complete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly URL: string = environment.URL;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.URL).pipe(take(1));
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/${id}`).pipe(take(1));
  }

  completeTask(data: Task): Observable<any> {
    return this.http.patch<any>(`${this.URL}/${data.id}`, data).pipe(take(1));
  }

  createTask(data: Task): Observable<any> {
    return this.http.post<any>(`${this.URL}`, data).pipe(take(1));
  }

  delete(id: number): Observable<any> {
    console.log(id);
    return this.http.delete<any>(`${this.URL}/${id}`).pipe(take(1));
  }
}
