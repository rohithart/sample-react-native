import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/transaction`;

  getByFinancialYear(fId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/financial-year/${fId}`);
  }

  getByFinancialYearArchived(fId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/financial-year/archived/${fId}`);
  }

  getForRange(orgId: string, data): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/range/${orgId}`, data);
  }

  getForRangeArchived(orgId: string, data): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/range/archived/${orgId}`, data);
  }

  get(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, data);
  }

  archive(id: string): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.apiUrl}/archive/${id}`, {});
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
