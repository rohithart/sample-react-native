import { apiClient } from '@utils/apiClient';
import { ApiResponse } from '@types/index';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

class NotificationApiService {
  async getNotificationSettings(): Promise<ApiResponse<NotificationSettings>> {
    return apiClient.get('/notifications/settings');
  }

  async updateNotificationSettings(
    settings: NotificationSettings
  ): Promise<ApiResponse<NotificationSettings>> {
    return apiClient.put('/notifications/settings', settings);
  }

  async getNotifications(page: number = 1): Promise<ApiResponse<any[]>> {
    return apiClient.get(`/notifications?page=${page}`);
  }

  async markAsRead(notificationId: string): Promise<ApiResponse<void>> {
    return apiClient.put(`/notifications/${notificationId}/read`, {});
  }

  async deleteNotification(notificationId: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/notifications/${notificationId}`);
  }
}

export const notificationApiService = new NotificationApiService();
