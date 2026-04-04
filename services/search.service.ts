import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/search`;

  search(orgId: string, query: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/${orgId}`, { query });
  }
}
