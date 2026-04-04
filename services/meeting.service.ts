import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meeting } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class MeetingService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/meeting`;

  getAll(orgId: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllForGroup(orgId: string, groupId: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/org/${orgId}/group/${groupId}`);
  }

  getAllArchived(orgId: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  getAllForUser(orgId: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/user/${orgId}`);
  }

  getForUser(orgId: string, id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.apiUrl}/view/${orgId}/${id}`);
  }

  get(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.apiUrl}/${id}`, data);
  }

  sendGoogleInvite(id: string): Observable<Meeting> {
    return this.http.patch<Meeting>(`${this.apiUrl}/google-invite/${id}`, {});
  }

  remind(id: string): Observable<Meeting> {
    return this.http.patch<Meeting>(`${this.apiUrl}/remind/${id}`, {});
  }

  archive(id: string): Observable<Meeting> {
    return this.http.patch<Meeting>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<Meeting> {
    return this.http.patch<Meeting>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
