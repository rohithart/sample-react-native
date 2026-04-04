import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workflow } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class WorkflowService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/workflow`;

  getAll(orgId: string): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllForUser(orgId: string, userId: string): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.apiUrl}/org/${orgId}/user/${userId}`);
  }

  getAllForGroup(orgId: string, groupId: string): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.apiUrl}/org/${orgId}/group/${groupId}`);
  }

  getAllArchived(orgId: string): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  getAllActive(orgId: string): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.apiUrl}/org/active/${orgId}`);
  }

  getAllForCategory(id: string): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.apiUrl}/category/${id}`);
  }

  get(id: string): Observable<Workflow> {
    return this.http.get<Workflow>(`${this.apiUrl}/${id}`);
  }

  getAllForWorkflow(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all/${id}`);
  }

  create(orgId: string, data: any): Observable<Workflow> {
    return this.http.post<Workflow>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: any): Observable<Workflow> {
    return this.http.put<Workflow>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, data: any): Observable<Workflow> {
    return this.http.patch<Workflow>(`${this.apiUrl}/status/${id}`, data);
  }

  updateUser(id: string, data: any): Observable<Workflow> {
    return this.http.patch<Workflow>(`${this.apiUrl}/user/${id}`, data);
  }

  updateGroup(id: string, data: any): Observable<Workflow> {
    return this.http.patch<Workflow>(`${this.apiUrl}/group/${id}`, data);
  }

  updatePriority(id: string, data: any): Observable<Workflow> {
    return this.http.patch<Workflow>(`${this.apiUrl}/priority/${id}`, data);
  }

  archive(id: string): Observable<Workflow> {
    return this.http.patch<Workflow>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<Workflow> {
    return this.http.patch<Workflow>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  flag(id: string, data: any): Observable<Workflow> {
    return this.http.patch<Workflow>(`${this.apiUrl}/flag/${id}`, data);
  }

  unflag(id: string): Observable<Workflow> {
    return this.http.patch<Workflow>(`${this.apiUrl}/unflag/${id}`, {});
  }
}
