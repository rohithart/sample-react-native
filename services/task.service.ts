import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/task`;

  getAll(orgId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllForUser(orgId: string, userId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/org/${orgId}/user/${userId}`);
  }

  getAllArchived(orgId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  getAllForWorkFlow(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/workflow/${id}`);
  }

  get(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, data: any): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/status/${id}`, data);
  }

  updateUser(id: string, data: any): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/user/${id}`, data);
  }

  archive(id: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  flag(id: string, data: any): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/flag/${id}`, data);
  }

  unflag(id: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/unflag/${id}`, {});
  }
}
