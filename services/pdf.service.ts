import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PDFService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/pdf`;

  getWorkflow(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/workflow/${id}`, { responseType: 'blob' as 'json' });
  }

  getTask(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/task/${id}`, { responseType: 'blob' as 'json' });
  }

  getQuote(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quote/${id}`, { responseType: 'blob' as 'json' });
  }

  getInvoice(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/invoice/${id}`, { responseType: 'blob' as 'json' });
  }

  getWorkorder(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/workorder/${id}`, { responseType: 'blob' as 'json' });
  }

  getEvidence(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/evidence/${id}`, { responseType: 'blob' as 'json' });
  }

  getMeeting(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/meeting/${id}`, { responseType: 'blob' as 'json' });
  }

  getDocument(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/document/${id}`, { responseType: 'blob' as 'json' });
  }

  getAsset(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/asset/${id}`, { responseType: 'blob' as 'json' });
  }

  getInformation(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/information/${id}`, { responseType: 'blob' as 'json' });
  }

  getBalanceSheet(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/balance-sheet/${id}`, { responseType: 'blob' as 'json' });
  }

  getIncomeExpense(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/income-expense/${id}`, { responseType: 'blob' as 'json' });
  }
}
