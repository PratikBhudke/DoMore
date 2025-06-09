import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface Expense {
  id?: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = `${environment.apiUrl}/expenses`;

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

  getAllExpenses(): Observable<Expense[]> {
    console.log('Getting all expenses with options:', this.getHttpOptions());
    return this.http.get<Expense[]>(this.apiUrl, this.getHttpOptions()).pipe(
      tap(expenses => console.log('Fetched expenses:', expenses)),
      catchError(this.handleError.bind(this))
    );
  }

  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`, this.getHttpOptions()).pipe(
      tap(expense => console.log('Fetched expense:', expense)),
      catchError(this.handleError.bind(this))
    );
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense, this.getHttpOptions()).pipe(
      tap(newExpense => console.log('Created expense:', newExpense)),
      catchError(this.handleError.bind(this))
    );
  }

  updateExpense(id: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense, this.getHttpOptions()).pipe(
      tap(updatedExpense => console.log('Updated expense:', updatedExpense)),
      catchError(this.handleError.bind(this))
    );
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions()).pipe(
      tap(() => console.log('Deleted expense id:', id)),
      catchError(this.handleError.bind(this))
    );
  }

  // Get expenses by date range
  getExpensesByDateRange(startDate: string, endDate: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/date-range?startDate=${startDate}&endDate=${endDate}`, this.getHttpOptions())
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Get expenses by category
  getExpensesByCategory(category: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/category/${category}`, this.getHttpOptions())
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Get expenses by payment method
  getExpensesByPaymentMethod(paymentMethod: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/payment-method/${paymentMethod}`, this.getHttpOptions())
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Get total expenses
  getTotalExpenses(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/total`, this.getHttpOptions())
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Get total expenses by category
  getTotalExpensesByCategory(category: string): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/total/category/${category}`, this.getHttpOptions())
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Get total expenses by date range
  getTotalExpensesByDateRange(startDate: string, endDate: string): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/total/date-range?startDate=${startDate}&endDate=${endDate}`, this.getHttpOptions())
      .pipe(catchError(this.handleError.bind(this)));
  }
} 