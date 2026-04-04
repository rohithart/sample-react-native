import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organisation } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class AdminOrganisationService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/admin-organisation`;

  getAll(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(this.apiUrl);
  }

  get(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  update(id: string, data: any): Observable<Organisation> {
    return this.http.put<Organisation>(`${this.apiUrl}/${id}`, data);
  }
}
