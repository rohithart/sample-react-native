import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VendorComment } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class VendorCommentService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/vendor-comment`;

  getAll(id: string): Observable<VendorComment[]> {
    return this.http.get<VendorComment[]>(`${this.apiUrl}/${id}`);
  }

  getQuote(id: string): Observable<VendorComment[]> {
    return this.http.get<VendorComment[]>(`${this.apiUrl}/quote/${id}`);
  }

  getInvoice(id: string): Observable<VendorComment[]> {
    return this.http.get<VendorComment[]>(`${this.apiUrl}/invoice/${id}`);
  }

  getWorkorder(id: string): Observable<VendorComment[]> {
    return this.http.get<VendorComment[]>(`${this.apiUrl}/workorder/${id}`);
  }

  getEvidence(id: string): Observable<VendorComment[]> {
    return this.http.get<VendorComment[]>(`${this.apiUrl}/evidence/${id}`);
  }

  create(orgId: string, data: any): Observable<VendorComment> {
    return this.http.post<VendorComment>(`${this.apiUrl}/${orgId}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
