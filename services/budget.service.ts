import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Budget } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/budget`;

  getByFinancialYear(yfId: string): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.apiUrl}/financial-year/${yfId}`);
  }

  getOther(id: string): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.apiUrl}/other/${id}`);
  }

  get(id: string): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.apiUrl}/${orgId}`, data);
  }

  approve(id: string): Observable<Budget> {
    return this.http.put<Budget>(`${this.apiUrl}/approve/${id}`, {});
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
