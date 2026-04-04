import { apiClient } from '@utils/apiClient';
import { ApiResponse, AdminOrganisation } from '@interfaces';

class AdminOrganisationService {
  async getAllOrganisations(): Promise<ApiResponse<AdminOrganisation[]>> {
    return apiClient.get(`/admin-organisation/all`);
  }

  async getOrganisation(orgId: string): Promise<ApiResponse<AdminOrganisation>> {
    return apiClient.get(`/admin-organisation/${orgId}`);
  }

  async suspend(orgId: string, reason?: string): Promise<ApiResponse<AdminOrganisation>> {
    return apiClient.patch(`/admin-organisation/suspend/${orgId}`, { reason });
  }

  async activate(orgId: string): Promise<ApiResponse<AdminOrganisation>> {
    return apiClient.patch(`/admin-organisation/activate/${orgId}`, {});
  }

  async delete(orgId: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/admin-organisation/${orgId}`);
  }

  async getStats(orgId: string): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.get(`/admin-organisation/stats/${orgId}`);
  }

  async getAllStats(): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.get(`/admin-organisation/stats/all`);
  }

  async getLogs(orgId: string): Promise<ApiResponse<any[]>> {
    return apiClient.get(`/admin-organisation/logs/${orgId}`);
  }
}

export const adminOrganisationService = new AdminOrganisationService();
