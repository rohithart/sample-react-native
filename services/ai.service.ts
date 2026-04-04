import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AIResponse } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AIService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/ai`;

  getYearlyTokenDetails(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/token/year/${id}`);
  }

  getMonthTokenDetails(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/token/month/${id}`);
  }

  getWorkflow(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/workflow/${id}`);
  }

  getTask(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/task/${id}`);
  }

  getQuote(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/quote/${id}`);
  }

  getInvoice(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/invoice/${id}`);
  }

  getWorkorder(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/workorder/${id}`);
  }

  getEvidence(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/evidence/${id}`);
  }

  getMeeting(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/meeting/${id}`);
  }

  getDocument(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/document/${id}`);
  }

  getAsset(id: string): Observable<AIResponse[]> {
    return this.http.get<AIResponse[]>(`${this.apiUrl}/asset/${id}`);
  }

  createWorkflow(id: string, data): Observable<AIResponse[]> {
    return this.http.post<AIResponse[]>(`${this.apiUrl}/workflow/${id}`, data);
  }

  createTask(id: string, data): Observable<AIResponse[]> {
    return this.http.post<AIResponse[]>(`${this.apiUrl}/task/${id}`, data);
  }

  createQuote(id: string, data): Observable<AIResponse[]> {
    return this.http.post<AIResponse[]>(`${this.apiUrl}/quote/${id}`, data);
  }

  createInvoice(id: string, data): Observable<AIResponse[]> {
    return this.http.post<AIResponse[]>(`${this.apiUrl}/invoice/${id}`, data);
  }

  createWorkorder(id: string, data): Observable<AIResponse[]> {
    return this.http.post<AIResponse[]>(`${this.apiUrl}/workorder/${id}`, data);
  }

  createEvidence(id: string, data): Observable<AIResponse[]> {
    return this.http.post<AIResponse[]>(`${this.apiUrl}/evidence/${id}`, data);
  }

  createMeeting(id: string, data): Observable<AIResponse[]> {
    return this.http.post<AIResponse[]>(`${this.apiUrl}/meeting/${id}`, data);
  }

  createDocument(id: string, data): Observable<AIResponse[]> {
    return this.http.post<AIResponse[]>(`${this.apiUrl}/document/${id}`, data);
  }

  createAsset(id: string, data): Observable<AIResponse[]> {
    return this.http.post<AIResponse[]>(`${this.apiUrl}/asset/${id}`, data);
  }
}
