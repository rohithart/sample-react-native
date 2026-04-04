import { apiClient } from '@utils/apiClient';
import { ApiResponse, Content } from '@interfaces';

class ContentService {
  async getAll(orgId: string): Promise<ApiResponse<Content[]>> {
    return apiClient.get(`/content/org/${orgId}`);
  }

  async getPublished(orgId: string): Promise<ApiResponse<Content[]>> {
    return apiClient.get(`/content/published/${orgId}`);
  }

  async getByType(orgId: string, contentType: string): Promise<ApiResponse<Content[]>> {
    return apiClient.get(`/content/type/${orgId}/${contentType}`);
  }

  async getByTag(orgId: string, tag: string): Promise<ApiResponse<Content[]>> {
    return apiClient.get(`/content/tag/${tag}/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Content>> {
    return apiClient.get(`/content/${id}`);
  }

  async create(orgId: string, data: Partial<Content>): Promise<ApiResponse<Content>> {
    return apiClient.post(`/content/${orgId}`, data);
  }

  async update(id: string, data: Partial<Content>): Promise<ApiResponse<Content>> {
    return apiClient.put(`/content/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/content/${id}`);
  }

  async publish(id: string): Promise<ApiResponse<Content>> {
    return apiClient.patch(`/content/publish/${id}`, {});
  }

  async unpublish(id: string): Promise<ApiResponse<Content>> {
    return apiClient.patch(`/content/unpublish/${id}`, {});
  }

  async archive(id: string): Promise<ApiResponse<Content>> {
    return apiClient.patch(`/content/archive/${id}`, {});
  }
}

export const contentService = new ContentService();
