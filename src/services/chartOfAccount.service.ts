import { apiClient } from '@utils/apiClient';
import { ApiResponse, ChartOfAccount } from '@interfaces';

class ChartOfAccountService {
  async getAll(orgId: string): Promise<ApiResponse<ChartOfAccount[]>> {
    return apiClient.get(`/chart-of-account/org/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<ChartOfAccount>> {
    return apiClient.get(`/chart-of-account/${id}`);
  }

  async create(orgId: string, data: Partial<ChartOfAccount>): Promise<ApiResponse<ChartOfAccount>> {
    return apiClient.post(`/chart-of-account/${orgId}`, data);
  }

  async update(id: string, data: Partial<ChartOfAccount>): Promise<ApiResponse<ChartOfAccount>> {
    return apiClient.put(`/chart-of-account/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/chart-of-account/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<ChartOfAccount>> {
    return apiClient.patch(`/chart-of-account/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<ChartOfAccount>> {
    return apiClient.patch(`/chart-of-account/unarchive/${id}`, {});
  }
}

export const chartOfAccountService = new ChartOfAccountService();
