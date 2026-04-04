import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/status`;

  getWorkflowStatuses(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/workflow/${id}`);
  }

  getVendorStatuses(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vendor/${id}`);
  }
}
