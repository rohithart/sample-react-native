import { apiClient } from '@utils/apiClient';
import { ApiResponse, Status } from '@interfaces';

class StatusService {
  async getAll(orgId: string): Promise<ApiResponse<Status[]>> {
    return apiClient.get(`/status/org/${orgId}`);
  }

  async getForEntity(orgId: string, entityType: string): Promise<ApiResponse<Status[]>> {
    return apiClient.get(`/status/org/${orgId}/entity/${entityType}`);
  }

  async get(id: string): Promise<ApiResponse<Status>> {
    return apiClient.get(`/status/${id}`);
  }

  async create(orgId: string, data: Partial<Status>): Promise<ApiResponse<Status>> {
    return apiClient.post(`/status/${orgId}`, data);
  }

  async update(id: string, data: Partial<Status>): Promise<ApiResponse<Status>> {
    return apiClient.put(`/status/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/status/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<Status>> {
    return apiClient.patch(`/status/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Status>> {
    return apiClient.patch(`/status/unarchive/${id}`, {});
  }

  async reorder(orgId: string, statusIds: string[]): Promise<ApiResponse<Status[]>> {
    return apiClient.patch(`/status/reorder/${orgId}`, { statusIds });
  }
}

export const statusService = new StatusService();
