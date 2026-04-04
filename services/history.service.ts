import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { History } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/history`;

  getWorkflow(id: string): Observable<History[]> {
    return this.http.get<History[]>(`${this.apiUrl}/workflow/${id}`);
  }

  deleteWorkflow(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/workflow${id}`);
  }

  getTask(id: string): Observable<History[]> {
    return this.http.get<History[]>(`${this.apiUrl}/task/${id}`);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/task${id}`);
  }

  getQuote(id: string): Observable<History[]> {
    return this.http.get<History[]>(`${this.apiUrl}/quote/${id}`);
  }

  deleteQuote(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/quote${id}`);
  }

  getInvoice(id: string): Observable<History[]> {
    return this.http.get<History[]>(`${this.apiUrl}/invoice/${id}`);
  }

  deleteInvoice(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/invoice${id}`);
  }

  getWorkorder(id: string): Observable<History[]> {
    return this.http.get<History[]>(`${this.apiUrl}/workorder/${id}`);
  }

  deleteWorkorder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/workorder${id}`);
  }

  getEvidence(id: string): Observable<History[]> {
    return this.http.get<History[]>(`${this.apiUrl}/evidence/${id}`);
  }

  deleteEvidence(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/evidence${id}`);
  }
}
