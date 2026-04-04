import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRequest } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class UserRequestService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/user-request`;

  getAll(orgId: string): Observable<UserRequest[]> {
    return this.http.get<UserRequest[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllForUser(orgId: string): Observable<UserRequest[]> {
    return this.http.get<UserRequest[]>(`${this.apiUrl}/user/${orgId}`);
  }

  getForUser(id: string): Observable<UserRequest> {
    return this.http.get<UserRequest>(`${this.apiUrl}/view/${id}`);
  }

  get(id: string): Observable<UserRequest> {
    return this.http.get<UserRequest>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: UserRequest): Observable<UserRequest> {
    return this.http.put<UserRequest>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  approve(id: string): Observable<UserRequest> {
    return this.http.patch<UserRequest>(`${this.apiUrl}/approve/${id}`, {});
  }

  reject(id: string): Observable<UserRequest> {
    return this.http.patch<UserRequest>(`${this.apiUrl}/reject/${id}`, {});
  }
}
