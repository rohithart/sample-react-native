import { apiClient } from '@utils/apiClient';
import { ApiResponse, Alert } from '@interfaces';

class AlertService {
  async getAll(orgId: string): Promise<ApiResponse<Alert[]>> {
    return apiClient.get(`/alert/org/${orgId}`);
  }

  async getUnread(orgId: string): Promise<ApiResponse<Alert[]>> {
    return apiClient.get(`/alert/unread/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Alert>> {
    return apiClient.get(`/alert/${id}`);
  }

  async create(orgId: string, data: Partial<Alert>): Promise<ApiResponse<Alert>> {
    return apiClient.post(`/alert/${orgId}`, data);
  }

  async markRead(id: string): Promise<ApiResponse<Alert>> {
    return apiClient.patch(`/alert/read/${id}`, {});
  }

  async markAllRead(orgId: string): Promise<ApiResponse<void>> {
    return apiClient.patch(`/alert/mark-all-read/${orgId}`, {});
  }

  async archive(id: string): Promise<ApiResponse<Alert>> {
    return apiClient.patch(`/alert/archive/${id}`, {});
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/alert/${id}`);
  }

  async deleteAll(orgId: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/alert/all/${orgId}`);
  }
}

export const alertService = new AlertService();
