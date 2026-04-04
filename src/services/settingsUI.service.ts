import { apiClient } from '@utils/apiClient';
import { ApiResponse, UISettings } from '@interfaces';

class SettingsUIService {
  async getSettings(userId: string): Promise<ApiResponse<UISettings>> {
    return apiClient.get(`/settings-ui/${userId}`);
  }

  async updateSettings(userId: string, settings: Partial<UISettings>): Promise<ApiResponse<UISettings>> {
    return apiClient.put(`/settings-ui/${userId}`, settings);
  }

  async updateTheme(userId: string, theme: 'light' | 'dark' | 'auto'): Promise<ApiResponse<UISettings>> {
    return apiClient.patch(`/settings-ui/theme/${userId}`, { theme });
  }

  async updateLanguage(userId: string, language: string): Promise<ApiResponse<UISettings>> {
    return apiClient.patch(`/settings-ui/language/${userId}`, { language });
  }

  async updateNotifications(userId: string, notifications: any): Promise<ApiResponse<UISettings>> {
    return apiClient.patch(`/settings-ui/notifications/${userId}`, notifications);
  }

  async updateLayout(userId: string, layout: any): Promise<ApiResponse<UISettings>> {
    return apiClient.patch(`/settings-ui/layout/${userId}`, layout);
  }

  async resetToDefaults(userId: string): Promise<ApiResponse<UISettings>> {
    return apiClient.patch(`/settings-ui/reset/${userId}`, {});
  }
}

export const settingsUIService = new SettingsUIService();
