import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/analytics`;

  getForYear(orgId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current/${orgId}`);
  }

  getForFinancialYear(orgId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/financial/${orgId}`);
  }

  getForRange(id: string, data): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/range/${id}`, data);
  }

  getFinancialStatement(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/income-expense/${id}`, {});
  }

  getBalanceSheet(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/balance-sheet/${id}`, {});
  }
}
