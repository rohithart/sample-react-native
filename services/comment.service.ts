import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/comment`;

  getWorkflow(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/workflow/${id}`);
  }

  getTask(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/task/${id}`);
  }

  getQuote(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/quote/${id}`);
  }

  getInvoice(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/invoice/${id}`);
  }

  getWorkorder(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/workorder/${id}`);
  }

  getEvidence(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/evidence/${id}`);
  }

  getVendor(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/vendor/${id}`);
  }

  getDocument(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/document/${id}`);
  }

  getAsset(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/asset/${id}`);
  }

  getBooking(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/booking/${id}`);
  }

  getRequest(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/request/${id}`);
  }

  getMeeting(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/meeting/${id}`);
  }

  getTransaction(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/transaction/${id}`);
  }

  getFinancialYear(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/financial-year/${id}`);
  }

  create(orgId: string, data: any): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${orgId}`, data);
  }

  createUserComment(orgId: string, data: any): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/user/${orgId}`, data);
  }

  createWallComment(orgId: string, data: any): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/wall/${orgId}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
