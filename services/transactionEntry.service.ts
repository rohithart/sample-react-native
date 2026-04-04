import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction, TransactionEntry } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class TransactionEntryService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/transaction-entry`;

  getByFinancialYear(fyId: string): Observable<TransactionEntry[]> {
    return this.http.get<TransactionEntry[]>(`${this.apiUrl}/financial-year/${fyId}`);
  }

  get(id: string): Observable<TransactionEntry[]> {
    return this.http.get<TransactionEntry[]>(`${this.apiUrl}/${id}`);
  }

  getRange(orgId: string, data: any): Observable<TransactionEntry[]> {
    return this.http.patch<TransactionEntry[]>(`${this.apiUrl}/range/${orgId}`, data);
  }

  create(transactionId: string, entries: any[]): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/${transactionId}`, entries);
  }
}
