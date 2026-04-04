import { apiClient } from '@utils/apiClient';
import { ApiResponse, ChatMessage } from '@types/index';

class ChatApiService {
  async getMessages(organisationId: string, limit: number = 50): Promise<ApiResponse<ChatMessage[]>> {
    return apiClient.get(`/chats/${organisationId}?limit=${limit}`);
  }

  async createMessage(organisationId: string, content: string): Promise<ApiResponse<ChatMessage>> {
    return apiClient.post('/chats', { organisationId, content });
  }

  async deleteMessage(messageId: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/chats/${messageId}`);
  }

  async updateMessage(messageId: string, content: string): Promise<ApiResponse<ChatMessage>> {
    return apiClient.put(`/chats/${messageId}`, { content });
  }

  async searchMessages(organisationId: string, query: string): Promise<ApiResponse<ChatMessage[]>> {
    return apiClient.get(`/chats/${organisationId}/search?q=${query}`);
  }
}

export const chatApiService = new ChatApiService();
