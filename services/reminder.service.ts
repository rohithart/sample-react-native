import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reminder } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/reminder`;

  getAllReminders(id: string): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`${this.apiUrl}/organisation/${id}`);
  }

  getById(id: string): Observable<Reminder> {
    return this.http.get<Reminder>(`${this.apiUrl}/${id}`);
  }

  getNextFive(id: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/upcoming/${id}`);
  }

  create(id: string, data: any): Observable<Reminder> {
    return this.http.post<Reminder>(`${this.apiUrl}/${id}`, data);
  }

  update(id: string, data: any): Observable<Reminder> {
    return this.http.put<Reminder>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<Reminder> {
    return this.http.delete<Reminder>(`${this.apiUrl}/${id}`);
  }

  enable(id: string): Observable<Reminder> {
    return this.http.patch<Reminder>(`${this.apiUrl}/enable/${id}`, {});
  }

  disable(id: string): Observable<Reminder> {
    return this.http.patch<Reminder>(`${this.apiUrl}/disable/${id}`, {});
  }
}
