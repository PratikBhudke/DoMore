import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Todo } from './todo.interface';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${environment.apiUrl}/todos`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHttpOptions() {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token found');
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      };
    }
    
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      withCredentials: true
    };
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized. Please log in again.';
          this.authService.logout();
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  getAllTodos(): Observable<Todo[]> {
    console.log('Getting all todos with options:', this.getHttpOptions());
    return this.http.get<Todo[]>(this.apiUrl, this.getHttpOptions()).pipe(
      tap(todos => console.log('Fetched todos:', todos)),
      catchError(this.handleError.bind(this))
    );
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`, this.getHttpOptions()).pipe(
      tap(todo => console.log('Fetched todo:', todo)),
      catchError(this.handleError.bind(this))
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo, this.getHttpOptions()).pipe(
      tap(newTodo => console.log('Created todo:', newTodo)),
      catchError(this.handleError.bind(this))
    );
  }

  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo, this.getHttpOptions()).pipe(
      tap(updatedTodo => console.log('Updated todo:', updatedTodo)),
      catchError(this.handleError.bind(this))
    );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions()).pipe(
      tap(() => console.log('Deleted todo id:', id)),
      catchError(this.handleError.bind(this))
    );
  }

  toggleTodoStatus(id: number): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}/toggle`, {}, this.getHttpOptions()).pipe(
      tap(toggledTodo => console.log('Toggled todo:', toggledTodo)),
      catchError(this.handleError.bind(this))
    );
  }
} 