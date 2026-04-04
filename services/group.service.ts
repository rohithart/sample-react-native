import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group, GroupUser, UserRole } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/group`;

  getAll(orgId: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllUsers(orgId: string): Observable<GroupUser[]> {
    return this.http.get<GroupUser[]>(`${this.apiUrl}/users/${orgId}`);
  }

  getAllUserGroup(id: string): Observable<GroupUser[]> {
    return this.http.get<GroupUser[]>(`${this.apiUrl}/user-groups/${id}`);
  }

  getCurrentUserGroup(id: string): Observable<GroupUser[]> {
    return this.http.get<GroupUser[]>(`${this.apiUrl}/current-user/${id}`);
  }

  getAllUnAssignedUsers(orgId: string): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.apiUrl}/unassigned-users/${orgId}`);
  }

  get(id: string): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Group): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/${orgId}`, data);
  }

  add(orgId: string, data: any): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/add/${orgId}`, data);
  }

  remove(orgId: string, data: any): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/remove/${orgId}`, data);
  }

  archive(id: string): Observable<UserRole> {
    return this.http.patch<UserRole>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<UserRole> {
    return this.http.patch<UserRole>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
