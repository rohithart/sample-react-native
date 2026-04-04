import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Folder } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class FolderService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/folder`;

  getAll(orgId: string): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllRecursive(orgId: string): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.apiUrl}/org/recursive/${orgId}`);
  }

  get(id: string): Observable<Folder> {
    return this.http.get<Folder>(`${this.apiUrl}/${id}`);
  }

  getAllSubfolder(orgId: string): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.apiUrl}/subfolder/${orgId}`);
  }

  move(id: string, data: any): Observable<Folder> {
    return this.http.patch<Folder>(`${this.apiUrl}/move/${id}`, data);
  }

  create(orgId: string, data: Folder): Observable<Folder> {
    return this.http.post<Folder>(`${this.apiUrl}/${orgId}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
