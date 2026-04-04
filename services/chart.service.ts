import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PropOrdoChart } from '@propordo/models/dist/ui';

@Injectable({ providedIn: 'root' })
export class ChartService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/chart`;

  getAdminChart(orgId: string): Observable<PropOrdoChart> {
    return this.http.get<PropOrdoChart>(`${this.apiUrl}/org/${orgId}`);
  }

  getUserChart(orgId: string): Observable<PropOrdoChart> {
    return this.http.get<PropOrdoChart>(`${this.apiUrl}/user/${orgId}`);
  }
}
