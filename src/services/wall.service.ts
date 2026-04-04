import { apiClient } from '@utils/apiClient';
import { ApiResponse, Wall } from '@interfaces';

class WallService {
  async getAll(orgId: string): Promise<ApiResponse<Wall[]>> {
    return apiClient.get(`/wall/org/${orgId}`);
  }

  async getForUser(userId: string): Promise<ApiResponse<Wall[]>> {
    return apiClient.get(`/wall/user/${userId}`);
  }

  async get(id: string): Promise<ApiResponse<Wall>> {
    return apiClient.get(`/wall/${id}`);
  }

  async create(orgId: string, content: string): Promise<ApiResponse<Wall>> {
    return apiClient.post(`/wall/${orgId}`, { content });
  }

  async update(id: string, content: string): Promise<ApiResponse<Wall>> {
    return apiClient.put(`/wall/${id}`, { content });
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/wall/${id}`);
  }

  async like(id: string): Promise<ApiResponse<Wall>> {
    return apiClient.patch(`/wall/like/${id}`, {});
  }

  async unlike(id: string): Promise<ApiResponse<Wall>> {
    return apiClient.patch(`/wall/unlike/${id}`, {});
  }
}

export const wallService = new WallService();
