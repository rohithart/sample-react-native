import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserVote, Vote } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class VoteService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/vote`;

  getAll(orgId: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllForGroup(orgId: string, groupId: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.apiUrl}/org/${orgId}/group/${groupId}`);
  }

  getAllArchived(orgId: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  getAllForUserArchived(orgId: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.apiUrl}/user/archived/${orgId}`);
  }

  getAllForUser(orgId: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.apiUrl}/user/${orgId}`);
  }

  getForUser(orgId: string, id: string): Observable<Vote> {
    return this.http.get<Vote>(`${this.apiUrl}/view/${orgId}/${id}`);
  }

  getAllForWorkFlow(id: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.apiUrl}/workflow/${id}`);
  }

  get(id: string): Observable<Vote> {
    return this.http.get<Vote>(`${this.apiUrl}/${id}`);
  }

  getAllCasted(id: string): Observable<UserVote[]> {
    return this.http.get<UserVote[]>(`${this.apiUrl}/all-casted/${id}`);
  }

  getCasted(id: string, orgId: string): Observable<UserVote> {
    return this.http.get<UserVote>(`${this.apiUrl}/casted/${orgId}/${id}`);
  }

  create(orgId: string, data: Vote): Observable<Vote> {
    return this.http.post<Vote>(`${this.apiUrl}/${orgId}`, data);
  }

  complete(id: string): Observable<Vote> {
    return this.http.patch<Vote>(`${this.apiUrl}/finish/${id}`, {});
  }

  remind(id: string): Observable<Vote> {
    return this.http.patch<Vote>(`${this.apiUrl}/remind/${id}`, {});
  }

  cast(id: string, orgId: string, data: any): Observable<Vote> {
    return this.http.patch<Vote>(`${this.apiUrl}/cast/${orgId}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
