import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class AttachmentService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/attachment`;

  getAll(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/org/${id}`);
  }

  getOrganisation(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/organisation/${id}`);
  }

  getWorkflow(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/workflow/${id}`);
  }

  getTask(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/task/${id}`);
  }

  getQuote(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/quote/${id}`);
  }

  getInvoice(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/invoice/${id}`);
  }

  getWorkorder(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/workorder/${id}`);
  }

  getEvidence(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/evidence/${id}`);
  }

  getMeeting(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/meeting/${id}`);
  }

  getDocument(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/document/${id}`);
  }

  getAsset(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/asset/${id}`);
  }

  getInformation(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/information/${id}`);
  }

  getTransaction(id: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/transaction/${id}`);
  }

  create(orgId: string, id: string, entity: string, data: any): Observable<File> {
    return this.http.post<File>(`${this.apiUrl}/${orgId}/${id}/${entity}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
