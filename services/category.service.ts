import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/category`;

  getAll(orgId: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/org/${orgId}`);
  }

  get(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
