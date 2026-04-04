import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/booking`;

  getAll(orgId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllForUser(orgId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/${orgId}`);
  }

  getForUser(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/view/${id}`);
  }

  get(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  getAllForBookingType(id: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/type/${id}`);
  }

  create(orgId: string, data: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  approve(id: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/approve/${id}`, {});
  }

  reject(id: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/reject/${id}`, {});
  }
}
