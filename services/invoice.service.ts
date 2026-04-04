import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/invoice`;

  getAll(orgId: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllArchived(orgId: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  getAllForWorkFlow(id: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/workflow/${id}`);
  }

  getAllForVendor(id: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/vendor/${id}`);
  }

  getAllForQuote(id: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/quote/${id}`);
  }

  getAllForWorkorder(id: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/workorder/${id}`);
  }

  get(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.apiUrl}/${id}`, data);
  }

  createForQuote(id: string): any {
    return this.http.post<Invoice>(`${this.apiUrl}/quote/${id}`, {});
  }

  createForWorkorder(id: string): any {
    return this.http.post<Invoice>(`${this.apiUrl}/workorder/${id}`, {});
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, data: any): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.apiUrl}/status/${id}`, data);
  }

  submit(id: string): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.apiUrl}/submit/${id}`, {});
  }

  remind(id: string): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.apiUrl}/remind/${id}`, {});
  }

  archive(id: string): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  flag(id: string, data: any): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.apiUrl}/flag/${id}`, data);
  }

  unflag(id: string): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.apiUrl}/unflag/${id}`, {});
  }
}
