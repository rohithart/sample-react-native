import { apiClient } from '@utils/apiClient';
import { ApiResponse, SettingsContext } from '@interfaces';

class SettingsContextService {
  async getSettings(orgId: string): Promise<ApiResponse<SettingsContext>> {
    return apiClient.get(`/settings-context/${orgId}`);
  }

  async updateSettings(orgId: string, settings: Partial<SettingsContext>): Promise<ApiResponse<SettingsContext>> {
    return apiClient.put(`/settings-context/${orgId}`, settings);
  }

  async updateBusinessInfo(orgId: string, businessInfo: any): Promise<ApiResponse<SettingsContext>> {
    return apiClient.patch(`/settings-context/business/${orgId}`, businessInfo);
  }

  async updateFinancialSettings(orgId: string, settings: any): Promise<ApiResponse<SettingsContext>> {
    return apiClient.patch(`/settings-context/financial/${orgId}`, settings);
  }

  async updateNotificationSettings(orgId: string, settings: any): Promise<ApiResponse<SettingsContext>> {
    return apiClient.patch(`/settings-context/notifications/${orgId}`, settings);
  }

  async addWYSIWYGEditor(orgId: string, editorName: string, config: any): Promise<ApiResponse<SettingsContext>> {
    return apiClient.patch(`/settings-context/editor/${orgId}`, { editorName, config });
  }

  async resetToDefaults(orgId: string): Promise<ApiResponse<SettingsContext>> {
    return apiClient.patch(`/settings-context/reset/${orgId}`, {});
  }
}

export const settingsContextService = new SettingsContextService();
