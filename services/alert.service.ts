import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alert } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/alert`;

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/web`);
  }
}
