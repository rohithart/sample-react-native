import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppNotification } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/notification`;

  getAll(orgId: string): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${this.apiUrl}/${orgId}`);
  }

  markRead(id: string): Observable<AppNotification> {
    return this.http.patch<AppNotification>(`${this.apiUrl}/read/${id}`, {});
  }

  markReadAll(orgId: string): Observable<AppNotification> {
    return this.http.patch<AppNotification>(`${this.apiUrl}/readAll/${orgId}`, {});
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  deleteAll(orgId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/all/${orgId}`);
  }
}
