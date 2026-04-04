import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vendor } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class VendorService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/vendor`;

  getAll(orgId: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllArchived(orgId: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  get(id: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.apiUrl}/${orgId}`, data);
  }

  edit(id: string, data: any): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/${id}`, data);
  }

  archive(id: string): Observable<Vendor> {
    return this.http.patch<Vendor>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<Vendor> {
    return this.http.patch<Vendor>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
