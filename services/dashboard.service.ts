import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/dashboard`;

  getAdminDashboard(orgId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/org/${orgId}`);
  }

  getUserDashboard(orgId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${orgId}`);
  }
}
