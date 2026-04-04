import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventType } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class EventTypeService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/event-type`;

  getAll(orgId: string): Observable<EventType[]> {
    return this.http.get<EventType[]>(`${this.apiUrl}/org/${orgId}`);
  }

  get(id: string): Observable<EventType> {
    return this.http.get<EventType>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: EventType): Observable<EventType> {
    return this.http.post<EventType>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: EventType): Observable<EventType> {
    return this.http.put<EventType>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
