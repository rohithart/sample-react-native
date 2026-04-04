import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/event`;

  getAll(orgId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/org/${orgId}`);
  }

  get(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  getAllForEventType(id: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/type/${id}`);
  }

  create(orgId: string, data: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
