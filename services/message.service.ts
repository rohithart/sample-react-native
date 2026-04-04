import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.api_url}/message`;

  getMessagesForConversation(conversationId: string, limit = 50, skip = 0): Observable<Message[]> {
    const params = new HttpParams().set('limit', limit).set('skip', skip);

    return this.http.get<Message[]>(`${this.apiUrl}/conversation/${conversationId}`, { params });
  }

  getById(messageId: string): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/${messageId}`);
  }

  sendMessage(conversationId: string, content: any): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/send/${conversationId}`, content);
  }

  markMessageRead(orgId: string, conversationId: string): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}/read/${orgId}/${conversationId}`, {});
  }

  toggleReaction(messageId: string, data: any): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}/react/${messageId}`, data);
  }

  deleteMessage(messageId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${messageId}`);
  }
}
