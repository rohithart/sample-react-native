import { apiClient } from '@utils/apiClient';
import { ApiResponse, AnalyticsEvent, AnalyticsReport } from '@interfaces';

class AnalyticsService {
  async trackEvent(orgId: string, eventName: string, data?: any): Promise<ApiResponse<AnalyticsEvent>> {
    return apiClient.post(`/analytics/track/${orgId}`, {
      eventName,
      eventData: data,
    });
  }

  async getEvents(orgId: string, dateRange?: { startDate: string; endDate: string }): Promise<ApiResponse<AnalyticsEvent[]>> {
    return apiClient.post(`/analytics/events/${orgId}`, dateRange || {});
  }

  async getReport(orgId: string, eventName: string, dateRange?: { startDate: string; endDate: string }): Promise<ApiResponse<AnalyticsReport>> {
    return apiClient.post(`/analytics/report/${orgId}/${eventName}`, dateRange || {});
  }

  async getDashboardMetrics(orgId: string): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.get(`/analytics/dashboard/${orgId}`);
  }

  async exportAnalytics(orgId: string, format: 'csv' | 'json'): Promise<Blob> {
    const response = await apiClient.get(`/analytics/export/${orgId}?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  }

  async clearOldData(orgId: string, daysOld: number): Promise<ApiResponse<void>> {
    return apiClient.delete(`/analytics/${orgId}?daysOld=${daysOld}`);
  }
}

export const analyticsService = new AnalyticsService();
