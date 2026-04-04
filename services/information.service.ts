import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Information } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class InformationService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/information`;

  getAll(orgId: string): Observable<Information[]> {
    return this.http.get<Information[]>(`${this.apiUrl}/org/${orgId}`);
  }

  get(id: string): Observable<Information> {
    return this.http.get<Information>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Information): Observable<Information> {
    return this.http.post<Information>(`${this.apiUrl}/${orgId}`, data);
  }

  update(orgId: string, data: any): Observable<Information> {
    return this.http.put<Information>(`${this.apiUrl}/${orgId}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
