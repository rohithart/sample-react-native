import { apiClient } from '@utils/apiClient';
import { ApiResponse, HistoryEntry } from '@interfaces';

class HistoryService {
  async getAll(orgId: string): Promise<ApiResponse<HistoryEntry[]>> {
    return apiClient.get(`/history/org/${orgId}`);
  }

  async getForEntity(entityId: string, entityType: string): Promise<ApiResponse<HistoryEntry[]>> {
    return apiClient.get(`/history/entity/${entityId}/${entityType}`);
  }

  async getForUser(userId: string): Promise<ApiResponse<HistoryEntry[]>> {
    return apiClient.get(`/history/user/${userId}`);
  }

  async getForDate(orgId: string, dateRange: { startDate: string; endDate: string }): Promise<ApiResponse<HistoryEntry[]>> {
    return apiClient.post(`/history/date-range/${orgId}`, dateRange);
  }

  async get(id: string): Promise<ApiResponse<HistoryEntry>> {
    return apiClient.get(`/history/${id}`);
  }

  async log(
    orgId: string,
    entityId: string,
    entityType: string,
    action: string,
    details?: any
  ): Promise<ApiResponse<HistoryEntry>> {
    return apiClient.post(`/history/${orgId}`, {
      entityId,
      entityType,
      action,
      ...details,
    });
  }

  async export(orgId: string, format: 'csv' | 'json'): Promise<Blob> {
    const response = await apiClient.get(`/history/export/${orgId}?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export const historyService = new HistoryService();
