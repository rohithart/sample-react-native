import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workorder } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class WorkorderService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/workorder`;

  getAll(orgId: string): Observable<Workorder[]> {
    return this.http.get<Workorder[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllArchived(orgId: string): Observable<Workorder[]> {
    return this.http.get<Workorder[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  getAllForWorkFlow(id: string): Observable<Workorder[]> {
    return this.http.get<Workorder[]>(`${this.apiUrl}/workflow/${id}`);
  }

  getAllForVendor(id: string): Observable<Workorder[]> {
    return this.http.get<Workorder[]>(`${this.apiUrl}/vendor/${id}`);
  }

  getAllForQuote(id: string): Observable<Workorder[]> {
    return this.http.get<Workorder[]>(`${this.apiUrl}/quote/${id}`);
  }

  get(id: string): Observable<Workorder> {
    return this.http.get<Workorder>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Workorder): Observable<Workorder> {
    return this.http.post<Workorder>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Workorder): Observable<Workorder> {
    return this.http.put<Workorder>(`${this.apiUrl}/${id}`, data);
  }

  createForQuote(id: string): any {
    return this.http.post<Workorder>(`${this.apiUrl}/quote/${id}`, {});
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, data: any): Observable<Workorder> {
    return this.http.patch<Workorder>(`${this.apiUrl}/status/${id}`, data);
  }

  submit(id: string): Observable<Workorder> {
    return this.http.patch<Workorder>(`${this.apiUrl}/submit/${id}`, {});
  }

  remind(id: string): Observable<Workorder> {
    return this.http.patch<Workorder>(`${this.apiUrl}/remind/${id}`, {});
  }

  archive(id: string): Observable<Workorder> {
    return this.http.patch<Workorder>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<Workorder> {
    return this.http.patch<Workorder>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  flag(id: string, data: any): Observable<Workorder> {
    return this.http.patch<Workorder>(`${this.apiUrl}/flag/${id}`, data);
  }

  unflag(id: string): Observable<Workorder> {
    return this.http.patch<Workorder>(`${this.apiUrl}/unflag/${id}`, {});
  }
}
