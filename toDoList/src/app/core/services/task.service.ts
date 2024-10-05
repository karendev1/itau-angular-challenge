import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ITask } from '../../shared/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:3000/tasks';

  constructor(private readonly http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getTaskById(id: number): Observable<ITask> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ITask>(url).pipe(catchError(this.handleError));
  }

  createTask(ITask: ITask): Observable<ITask> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<ITask>(this.apiUrl, ITask, { headers })
      .pipe(catchError(this.handleError));
  }

  updateTask(id: string, ITask: ITask): Observable<ITask> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<ITask>(url, ITask, { headers })
      .pipe(catchError(this.handleError));
  }

  markTaskAsCompleted(id: number): Observable<ITask> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { isCompleted: true, status: 'done' };
    return this.http
      .patch<ITask>(url, body, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro', error);
    return throwError(
      () => new Error('Erro na operação. Por favor, tente novamente.')
    );
  }
}
