import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Wall } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class WallService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/wall`;

  getAll(orgId: string): Observable<Wall[]> {
    return this.http.get<Wall[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllForUser(orgId: string, userId: string): Observable<Wall[]> {
    return this.http.get<Wall[]>(`${this.apiUrl}/org/${orgId}/user/${userId}`);
  }

  create(orgId: string, data: any): Observable<Wall> {
    return this.http.post<Wall>(`${this.apiUrl}/${orgId}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  like(id: string, orgId: string): Observable<Wall> {
    return this.http.patch<Wall>(`${this.apiUrl}/like/${orgId}/${id}`, {});
  }

  unlike(id: string, orgId: string): Observable<Wall> {
    return this.http.patch<Wall>(`${this.apiUrl}/unlike/${orgId}/${id}`, {});
  }
}
