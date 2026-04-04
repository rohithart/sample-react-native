import { apiClient } from '@utils/apiClient';
import { Dashboard, ApiResponse } from '@interfaces';

class DashboardService {
  async getDashboards(organisationId: string): Promise<ApiResponse<Dashboard[]>> {
    return apiClient.get(`/dashboards?organisationId=${organisationId}`);
  }

  async getDashboardById(id: string): Promise<ApiResponse<Dashboard>> {
    return apiClient.get(`/dashboards/${id}`);
  }

  async createDashboard(data: Partial<Dashboard>): Promise<ApiResponse<Dashboard>> {
    return apiClient.post('/dashboards', data);
  }

  async updateDashboard(id: string, data: Partial<Dashboard>): Promise<ApiResponse<Dashboard>> {
    return apiClient.put(`/dashboards/${id}`, data);
  }

  async deleteDashboard(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/dashboards/${id}`);
  }
}

export const dashboardService = new DashboardService();
