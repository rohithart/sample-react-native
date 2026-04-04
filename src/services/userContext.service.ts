import { apiClient } from '@utils/apiClient';
import { ApiResponse, UserContext } from '@interfaces';

class UserContextService {
  async getCurrentUserContext(): Promise<ApiResponse<UserContext>> {
    return apiClient.get(`/user-context/current`);
  }

  async getUserContext(userId: string): Promise<ApiResponse<UserContext>> {
    return apiClient.get(`/user-context/${userId}`);
  }

  async updateUserContext(userId: string, data: Partial<UserContext>): Promise<ApiResponse<UserContext>> {
    return apiClient.put(`/user-context/${userId}`, data);
  }

  async setCurrentOrganisation(orgId: string): Promise<ApiResponse<UserContext>> {
    return apiClient.patch(`/user-context/set-organisation/${orgId}`, {});
  }

  async updateSettings(userId: string, settings: Record<string, any>): Promise<ApiResponse<UserContext>> {
    return apiClient.patch(`/user-context/settings/${userId}`, settings);
  }

  async getPermissions(userId: string, orgId: string): Promise<ApiResponse<string[]>> {
    return apiClient.get(`/user-context/permissions/${userId}/${orgId}`);
  }

  async hasPermission(userId: string, orgId: string, permission: string): Promise<ApiResponse<boolean>> {
    return apiClient.get(`/user-context/has-permission/${userId}/${orgId}/${permission}`);
  }
}

export const userContextService = new UserContextService();
