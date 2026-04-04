import { apiClient } from '@utils/apiClient';
import { ApiResponse, Timeline } from '@interfaces';

class TimelineService {
  async getAll(orgId: string): Promise<ApiResponse<Timeline[]>> {
    return apiClient.get(`/timeline/org/${orgId}`);
  }

  async getForEntity(entityId: string, entityType: string): Promise<ApiResponse<Timeline[]>> {
    return apiClient.get(`/timeline/entity/${entityId}/${entityType}`);
  }

  async getForUser(userId: string): Promise<ApiResponse<Timeline[]>> {
    return apiClient.get(`/timeline/user/${userId}`);
  }

  async getForDateRange(
    orgId: string,
    dateRange: { startDate: string; endDate: string }
  ): Promise<ApiResponse<Timeline[]>> {
    return apiClient.post(`/timeline/range/${orgId}`, dateRange);
  }

  async get(id: string): Promise<ApiResponse<Timeline>> {
    return apiClient.get(`/timeline/${id}`);
  }

  async log(
    orgId: string,
    entityId: string,
    entityType: string,
    action: string,
    description?: string,
    metadata?: any
  ): Promise<ApiResponse<Timeline>> {
    return apiClient.post(`/timeline/${orgId}`, {
      entityId,
      entityType,
      action,
      description,
      metadata,
    });
  }

  async export(orgId: string, format: 'csv' | 'json'): Promise<Blob> {
    const response = await apiClient.get(`/timeline/export/${orgId}?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export const timelineService = new TimelineService();
