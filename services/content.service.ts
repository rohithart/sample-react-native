import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Content } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.api_url}/content`;

  get(id: string): Observable<Content> {
    return this.http.get<Content>(`${this.apiUrl}/${id}`);
  }

  addContent(data: Content): Observable<Content> {
    return this.http.post<Content>(this.apiUrl, data);
  }

  updateContent(id: string, data: Content): Observable<Content> {
    return this.http.put<Content>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<Content> {
    return this.http.delete<Content>(`${this.apiUrl}/${id}`);
  }

  getAllBlogs(): Observable<Content[]> {
    return this.http.get<Content[]>(`${this.apiUrl}/blogs/all`);
  }

  getAllNews(): Observable<Content[]> {
    return this.http.get<Content[]>(`${this.apiUrl}/news/all`);
  }
}
