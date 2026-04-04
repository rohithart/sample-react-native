import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asset } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/asset`;

  getAll(orgId: string): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.apiUrl}/org/${orgId}`);
  }

  getAllArchived(orgId: string): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.apiUrl}/org/archived/${orgId}`);
  }

  getAllForAssetType(id: string): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.apiUrl}/type/${id}`);
  }

  get(id: string): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`);
  }

  create(orgId: string, data: Asset): Observable<Asset> {
    return this.http.post<Asset>(`${this.apiUrl}/${orgId}`, data);
  }

  update(id: string, data: Asset): Observable<Asset> {
    return this.http.put<Asset>(`${this.apiUrl}/${id}`, data);
  }

  archive(id: string): Observable<Asset> {
    return this.http.patch<Asset>(`${this.apiUrl}/archive/${id}`, {});
  }

  unarchive(id: string): Observable<Asset> {
    return this.http.patch<Asset>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  flag(id: string, data: any): Observable<Asset> {
    return this.http.patch<Asset>(`${this.apiUrl}/flag/${id}`, data);
  }

  unflag(id: string): Observable<Asset> {
    return this.http.patch<Asset>(`${this.apiUrl}/unflag/${id}`, {});
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
