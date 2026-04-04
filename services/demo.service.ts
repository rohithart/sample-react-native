import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/demo`;

  getDemoToken(body: any) {
    return this.http.post(`${this.apiUrl}/start`, body);
  }
}
