import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quote } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/quote`;

  getAll(orgId: string): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllArchived(orgId: string): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  getAllForWorkFlow(id: string): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.apiUrl}/workflow/${id}`);
  }

  getAllForVendor(id: string): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.apiUrl}/vendor/${id}`);
  }

  get(id: string): Observable<Quote> {
    return this.http.get<Quote>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Quote): Observable<Quote[]> {
    return this.http.post<Quote[]>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Quote): Observable<Quote> {
    return this.http.put<Quote>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, data: any): Observable<Quote> {
    return this.http.patch<Quote>(`${this.apiUrl}/status/${id}`, data);
  }

  extendQuote(id: string): Observable<Quote> {
    return this.http.patch<Quote>(`${this.apiUrl}/extend/${id}`, {});
  }

  remind(id: string): Observable<Quote> {
    return this.http.patch<Quote>(`${this.apiUrl}/remind/${id}`, {});
  }

  submit(id: string): Observable<Quote> {
    return this.http.patch<Quote>(`${this.apiUrl}/submit/${id}`, {});
  }

  archive(id: string): Observable<Quote> {
    return this.http.patch<Quote>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<Quote> {
    return this.http.patch<Quote>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  flag(id: string, data: any): Observable<Quote> {
    return this.http.patch<Quote>(`${this.apiUrl}/flag/${id}`, data);
  }

  unflag(id: string): Observable<Quote> {
    return this.http.patch<Quote>(`${this.apiUrl}/unflag/${id}`, {});
  }
}
