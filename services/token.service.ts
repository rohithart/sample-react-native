import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/token`;

  get(): Observable<Token[]> {
    return this.http.get<Token[]>(this.apiUrl);
  }

  create(data: any): Observable<Token> {
    return this.http.post<Token>(this.apiUrl, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
