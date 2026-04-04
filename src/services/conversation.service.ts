import { apiClient } from '@utils/apiClient';
import { ApiResponse, Conversation } from '@interfaces';

class ConversationService {
  async getAll(orgId: string): Promise<ApiResponse<Conversation[]>> {
    return apiClient.get(`/conversation/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Conversation[]>> {
    return apiClient.get(`/conversation/org/archived/${orgId}`);
  }

  async getForUser(userId: string): Promise<ApiResponse<Conversation[]>> {
    return apiClient.get(`/conversation/user/${userId}`);
  }

  async get(id: string): Promise<ApiResponse<Conversation>> {
    return apiClient.get(`/conversation/${id}`);
  }

  async create(orgId: string, data: Partial<Conversation>): Promise<ApiResponse<Conversation>> {
    return apiClient.post(`/conversation/${orgId}`, data);
  }

  async update(id: string, data: Partial<Conversation>): Promise<ApiResponse<Conversation>> {
    return apiClient.put(`/conversation/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/conversation/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<Conversation>> {
    return apiClient.patch(`/conversation/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Conversation>> {
    return apiClient.patch(`/conversation/unarchive/${id}`, {});
  }

  async addParticipant(id: string, userId: string): Promise<ApiResponse<Conversation>> {
    return apiClient.patch(`/conversation/add-participant/${id}`, { userId });
  }

  async removeParticipant(id: string, userId: string): Promise<ApiResponse<Conversation>> {
    return apiClient.patch(`/conversation/remove-participant/${id}`, { userId });
  }
}

export const conversationService = new ConversationService();
