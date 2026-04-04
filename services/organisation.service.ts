import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrgAccess, Organisation } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class OrganisationService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/organisation`;

  getAll(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(this.apiUrl);
  }

  get(id: string): Observable<Organisation> {
    return this.http.get<Organisation>(`${this.apiUrl}/${id}`);
  }

  getAccess(id: string): Observable<OrgAccess> {
    return this.http.get<OrgAccess>(`${this.apiUrl}/access/${id}`);
  }

  create(data: any): Observable<OrgAccess> {
    return this.http.post<OrgAccess>(this.apiUrl, data);
  }

  update(id: string, data: any): Observable<Organisation> {
    return this.http.put<Organisation>(`${this.apiUrl}/${id}`, data);
  }

  startOnboarding(id: string): Observable<Organisation> {
    return this.http.patch<Organisation>(`${this.apiUrl}/start-onboarding/${id}`, {});
  }

  stopOnboarding(id: string): Observable<Organisation> {
    return this.http.patch<Organisation>(`${this.apiUrl}/stop-onboarding/${id}`, {});
  }
}
