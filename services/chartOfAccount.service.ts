import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartOfAccount, TransactionEntry } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class ChartOfAccountService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/chart-of-account`;

  getAll(orgId: string): Observable<ChartOfAccount[]> {
    return this.http.get<ChartOfAccount[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getByFinancialYear(fyId: string, id: string): Observable<TransactionEntry[]> {
    return this.http.get<TransactionEntry[]>(`${this.apiUrl}/financial-year/${fyId}/${id}`);
  }

  get(id: string): Observable<ChartOfAccount> {
    return this.http.get<ChartOfAccount>(`${this.apiUrl}/${id}`);
  }

  getSeed(orgId: string): Observable<ChartOfAccount[]> {
    return this.http.get<ChartOfAccount[]>(`${this.apiUrl}/seed/${orgId}`);
  }

  setSeed(orgId: string): Observable<ChartOfAccount> {
    return this.http.post<ChartOfAccount>(`${this.apiUrl}/seed/${orgId}`, {});
  }

  create(orgId: string, data: ChartOfAccount): Observable<ChartOfAccount> {
    return this.http.post<ChartOfAccount>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: ChartOfAccount): Observable<ChartOfAccount> {
    return this.http.put<ChartOfAccount>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
