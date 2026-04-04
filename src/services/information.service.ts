import { apiClient } from '@utils/apiClient';
import { ApiResponse, Information } from '@interfaces';

class InformationService {
  async getAll(orgId: string): Promise<ApiResponse<Information[]>> {
    return apiClient.get(`/information/org/${orgId}`);
  }

  async getPublished(orgId: string): Promise<ApiResponse<Information[]>> {
    return apiClient.get(`/information/published/${orgId}`);
  }

  async getByCategory(orgId: string, category: string): Promise<ApiResponse<Information[]>> {
    return apiClient.get(`/information/category/${orgId}/${category}`);
  }

  async get(id: string): Promise<ApiResponse<Information>> {
    return apiClient.get(`/information/${id}`);
  }

  async create(orgId: string, data: Partial<Information>): Promise<ApiResponse<Information>> {
    return apiClient.post(`/information/${orgId}`, data);
  }

  async update(id: string, data: Partial<Information>): Promise<ApiResponse<Information>> {
    return apiClient.put(`/information/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/information/${id}`);
  }

  async publish(id: string): Promise<ApiResponse<Information>> {
    return apiClient.patch(`/information/publish/${id}`, {});
  }

  async unpublish(id: string): Promise<ApiResponse<Information>> {
    return apiClient.patch(`/information/unpublish/${id}`, {});
  }

  async reorder(orgId: string, ids: string[]): Promise<ApiResponse<Information[]>> {
    return apiClient.patch(`/information/reorder/${orgId}`, { ids });
  }
}

export const informationService = new InformationService();
