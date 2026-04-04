import { apiClient } from '@utils/apiClient';
import { ApiResponse, Comment } from '@interfaces';

class CommentService {
  async getAll(orgId: string): Promise<ApiResponse<Comment[]>> {
    return apiClient.get(`/comment/org/${orgId}`);
  }

  async getAllForEntity(entityId: string, entityType: string): Promise<ApiResponse<Comment[]>> {
    return apiClient.get(`/comment/entity/${entityId}/${entityType}`);
  }

  async get(id: string): Promise<ApiResponse<Comment>> {
    return apiClient.get(`/comment/${id}`);
  }

  async create(
    orgId: string,
    entityId: string,
    entityType: string,
    content: string
  ): Promise<ApiResponse<Comment>> {
    return apiClient.post(`/comment/${orgId}`, {
      entityId,
      entityType,
      content,
    });
  }

  async update(id: string, content: string): Promise<ApiResponse<Comment>> {
    return apiClient.put(`/comment/${id}`, { content });
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/comment/${id}`);
  }
}

export const commentService = new CommentService();
