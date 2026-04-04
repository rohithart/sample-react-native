import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evidence } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class EvidenceService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/evidence`;

  getAll(orgId: string): Observable<Evidence[]> {
    return this.http.get<Evidence[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllArchived(orgId: string): Observable<Evidence[]> {
    return this.http.get<Evidence[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  getAllForWorkFlow(id: string): Observable<Evidence[]> {
    return this.http.get<Evidence[]>(`${this.apiUrl}/workflow/${id}`);
  }

  getAllForVendor(id: string): Observable<Evidence[]> {
    return this.http.get<Evidence[]>(`${this.apiUrl}/vendor/${id}`);
  }

  get(id: string): Observable<Evidence> {
    return this.http.get<Evidence>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Evidence): Observable<Evidence> {
    return this.http.post<Evidence>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Evidence): Observable<Evidence> {
    return this.http.put<Evidence>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, data: any): Observable<Evidence> {
    return this.http.patch<Evidence>(`${this.apiUrl}/status/${id}`, data);
  }

  requestFromVendor(id: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/request/${id}`, {});
  }

  createForQuote(id: string): any {
    return this.http.post<Evidence>(`${this.apiUrl}/quote/${id}`, {});
  }

  createForWorkorder(id: string): any {
    return this.http.post<Evidence>(`${this.apiUrl}/workorder/${id}`, {});
  }

  submit(id: string, data: Evidence): Observable<Evidence> {
    return this.http.patch<Evidence>(`${this.apiUrl}/submit/${id}`, data);
  }

  archive(id: string): Observable<Evidence> {
    return this.http.patch<Evidence>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<Evidence> {
    return this.http.patch<Evidence>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  flag(id: string, data: any): Observable<Evidence> {
    return this.http.patch<Evidence>(`${this.apiUrl}/flag/${id}`, data);
  }

  unflag(id: string): Observable<Evidence> {
    return this.http.patch<Evidence>(`${this.apiUrl}/unflag/${id}`, {});
  }
}
