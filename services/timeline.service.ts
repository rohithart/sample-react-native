import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Timeline } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class TimelineService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/timeline`;

  getUser(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/user/${id}`);
  }

  getWorkflow(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/workflow/${id}`);
  }

  getTask(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/task/${id}`);
  }

  getQuote(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/quote/${id}`);
  }

  getInvoice(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/invoice/${id}`);
  }

  getWorkorder(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/workorder/${id}`);
  }

  getEvidence(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/evidence/${id}`);
  }

  getVote(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/vote/${id}`);
  }

  getVendor(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/vendor/${id}`);
  }

  getDocument(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/document/${id}`);
  }

  getAsset(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/asset/${id}`);
  }

  getFinancialYear(id: string): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/financial-year/${id}`);
  }
}
