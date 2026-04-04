import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group, User, UserRole } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/user`;

  getAll(orgId: string): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllAdmins(orgId: string): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.apiUrl}/admins/${orgId}`);
  }

  get(id: string): Observable<UserRole> {
    return this.http.get<UserRole>(`${this.apiUrl}/${id}`);
  }

  getAllUnAssignedGroups(id: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/unassigned-groups/${id}`);
  }

  getUserRole(orgId: string): Observable<UserRole> {
    return this.http.get<UserRole>(`${this.apiUrl}/role/${orgId}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/current`);
  }

  getAllAssignUsers(orgId: string): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.apiUrl}/assign/${orgId}`);
  }

  create(orgId: string, data: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${orgId}`, data);
  }

  onboard(orgCode: string, data: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/onboard/${orgCode}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  archive(id: string): Observable<UserRole> {
    return this.http.patch<UserRole>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<UserRole> {
    return this.http.patch<UserRole>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  updateStatus(id: string, data: any): Observable<UserRole> {
    return this.http.patch<UserRole>(`${this.apiUrl}/status/${id}`, data);
  }

  updateProfile(id: string, data: any): Observable<UserRole> {
    return this.http.patch<UserRole>(`${this.apiUrl}/profile/${id}`, data);
  }

  updateRoleProfile(id: string, data: any): Observable<UserRole> {
    return this.http.patch<UserRole>(`${this.apiUrl}/role-profile/${id}`, data);
  }
}
