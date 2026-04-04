import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conversation } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.api_url}/conversation`;

  getConversationForGroup(id: string, orgId: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/group/${id}/${orgId}`);
  }

  getById(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/${id}`);
  }

  create(id: string, payload: any): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.apiUrl}/${id}`, payload);
  }
}
