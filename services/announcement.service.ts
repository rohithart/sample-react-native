import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Announcement } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/announcement`;

  getAll(orgId: string): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllForGroup(orgId: string, groupId: string): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/org/${orgId}/group/${groupId}`);
  }

  getAllForUser(orgId: string): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/user/${orgId}`);
  }

  getLatest(orgId: string): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/latest/${orgId}`);
  }

  getForUser(orgId: string, id: string): Observable<Announcement> {
    return this.http.get<Announcement>(`${this.apiUrl}/view/${orgId}/${id}`);
  }

  get(id: string): Observable<Announcement> {
    return this.http.get<Announcement>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.apiUrl}/${orgId}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
