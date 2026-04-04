import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingType } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class BookingTypeService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/booking-type`;

  getAll(orgId: string): Observable<BookingType[]> {
    return this.http.get<BookingType[]>(`${this.apiUrl}/org/${orgId}`);
  }

  get(id: string): Observable<BookingType> {
    return this.http.get<BookingType>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: BookingType): Observable<BookingType> {
    return this.http.post<BookingType>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: BookingType): Observable<BookingType> {
    return this.http.put<BookingType>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
