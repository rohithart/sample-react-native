import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentStore } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/document`;

  getAll(orgId: string): Observable<DocumentStore[]> {
    return this.http.get<DocumentStore[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllArchived(orgId: string): Observable<DocumentStore[]> {
    return this.http.get<DocumentStore[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  getAllFolder(folderId: string): Observable<DocumentStore[]> {
    return this.http.get<DocumentStore[]>(`${this.apiUrl}/folder/${folderId}`);
  }

  getAllArchivedFolder(folderId: string): Observable<DocumentStore[]> {
    return this.http.get<DocumentStore[]>(`${this.apiUrl}/folder/archived/${folderId}`);
  }

  get(id: string): Observable<DocumentStore> {
    return this.http.get<DocumentStore>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: DocumentStore): Observable<DocumentStore> {
    return this.http.post<DocumentStore>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: DocumentStore): Observable<DocumentStore> {
    return this.http.put<DocumentStore>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  move(id: string, data: any): Observable<DocumentStore> {
    return this.http.patch<DocumentStore>(`${this.apiUrl}/move/${id}`, data);
  }

  archive(id: string): Observable<DocumentStore> {
    return this.http.patch<DocumentStore>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<DocumentStore> {
    return this.http.patch<DocumentStore>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  flag(id: string, data: any): Observable<DocumentStore> {
    return this.http.patch<DocumentStore>(`${this.apiUrl}/flag/${id}`, data);
  }

  unflag(id: string): Observable<DocumentStore> {
    return this.http.patch<DocumentStore>(`${this.apiUrl}/unflag/${id}`, {});
  }
}
