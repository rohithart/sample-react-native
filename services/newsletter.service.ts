import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/newsletter`;

  submit(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/subscribe`, data);
  }
}
