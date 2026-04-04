import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssetType } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class AssetTypeService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/asset-type`;

  getAll(orgId: string): Observable<AssetType[]> {
    return this.http.get<AssetType[]>(`${this.apiUrl}/org/${orgId}`);
  }

  get(id: string): Observable<AssetType> {
    return this.http.get<AssetType>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: AssetType): Observable<AssetType> {
    return this.http.post<AssetType>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: AssetType): Observable<AssetType> {
    return this.http.put<AssetType>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
