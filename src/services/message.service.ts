import { apiClient } from '@utils/apiClient';
import { ApiResponse, Message } from '@interfaces';

class MessageService {
  async getMessagesForConversation(
    conversationId: string,
    limit: number = 50,
    skip: number = 0
  ): Promise<ApiResponse<Message[]>> {
    return apiClient.get(
      `/message/conversation/${conversationId}?limit=${limit}&skip=${skip}`
    );
  }

  async getById(messageId: string): Promise<ApiResponse<Message>> {
    return apiClient.get(`/message/${messageId}`);
  }

  async sendMessage(conversationId: string, content: string): Promise<ApiResponse<Message>> {
    return apiClient.post(`/message/send/${conversationId}`, { content });
  }

  async markMessageRead(orgId: string, conversationId: string): Promise<ApiResponse<Message>> {
    return apiClient.put(`/message/read/${orgId}/${conversationId}`, {});
  }

  async toggleReaction(messageId: string, reaction: string): Promise<ApiResponse<Message>> {
    return apiClient.put(`/message/react/${messageId}`, { reaction });
  }

  async deleteMessage(messageId: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/message/${messageId}`);
  }
}

export const messageService = new MessageService();
