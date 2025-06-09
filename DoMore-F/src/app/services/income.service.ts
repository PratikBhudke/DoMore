import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface Income {
  id?: number;
  source: string;
  amount: number;
  date: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiUrl = `${environment.apiUrl}/incomes`;

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

  getAllIncomes(): Observable<Income[]> {
    console.log('Getting all incomes with options:', this.getHttpOptions());
    return this.http.get<Income[]>(this.apiUrl, this.getHttpOptions()).pipe(
      tap(incomes => console.log('Fetched incomes:', incomes)),
      catchError(this.handleError.bind(this))
    );
  }

  getIncomeById(id: number): Observable<Income> {
    return this.http.get<Income>(`${this.apiUrl}/${id}`, this.getHttpOptions()).pipe(
      tap(income => console.log('Fetched income:', income)),
      catchError(this.handleError.bind(this))
    );
  }

  createIncome(income: Income): Observable<Income> {
    return this.http.post<Income>(this.apiUrl, income, this.getHttpOptions()).pipe(
      tap(newIncome => console.log('Created income:', newIncome)),
      catchError(this.handleError.bind(this))
    );
  }

  updateIncome(id: number, income: Income): Observable<Income> {
    return this.http.put<Income>(`${this.apiUrl}/${id}`, income, this.getHttpOptions()).pipe(
      tap(updatedIncome => console.log('Updated income:', updatedIncome)),
      catchError(this.handleError.bind(this))
    );
  }

  deleteIncome(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions()).pipe(
      tap(() => console.log('Deleted income id:', id)),
      catchError(this.handleError.bind(this))
    );
  }

  // Get incomes by date range
  getIncomesByDateRange(startDate: string, endDate: string): Observable<Income[]> {
    return this.http.get<Income[]>(`${this.apiUrl}/date-range?startDate=${startDate}&endDate=${endDate}`, this.getHttpOptions())
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Get total income
  getTotalIncome(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/total`, this.getHttpOptions())
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Get total income by date range
  getTotalIncomeByDateRange(startDate: string, endDate: string): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/total/date-range?startDate=${startDate}&endDate=${endDate}`, this.getHttpOptions())
      .pipe(catchError(this.handleError.bind(this)));
  }
} 