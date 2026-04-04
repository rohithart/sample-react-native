import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/admin-email`;
  private apiEmailUrl = `${environment.api_url}/email`;

  sendReport(orgId: string, data): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/report/${orgId}`, data);
  }

  sendReportComment(id: string, data): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/report-comment/${id}`, data);
  }

  sendReportWall(id: string, data): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/report-wall/${id}`, data);
  }

  sendContact(orgId: string, data): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact-admin/${orgId}`, data);
  }

  sendFeedback(data): Observable<any> {
    return this.http.post<any>(`${this.apiEmailUrl}/feedback`, data);
  }
}
