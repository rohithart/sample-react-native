import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinancialYear } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class FinancialYearService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/financial-year`;

  getAll(orgId: string): Observable<FinancialYear[]> {
    return this.http.get<FinancialYear[]>(`${this.apiUrl}/org/${orgId}`);
  }

  current(orgId: string): Observable<FinancialYear[]> {
    return this.http.get<FinancialYear[]>(`${this.apiUrl}/current/${orgId}`);
  }

  get(id: string): Observable<FinancialYear> {
    return this.http.get<FinancialYear>(`${this.apiUrl}/${id}`);
  }

  getDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details/${id}`);
  }

  create(orgId: string, data: FinancialYear): Observable<FinancialYear> {
    return this.http.post<FinancialYear>(`${this.apiUrl}/${orgId}`, data);
  }

  setCurrent(id: string): Observable<FinancialYear> {
    return this.http.put<FinancialYear>(`${this.apiUrl}/${id}`, {});
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
