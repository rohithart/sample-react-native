import { apiClient } from '@utils/apiClient';
import { ApiResponse, FinancialYear } from '@interfaces';

class FinancialYearService {
  async getAll(orgId: string): Promise<ApiResponse<FinancialYear[]>> {
    return apiClient.get(`/financial-year/org/${orgId}`);
  }

  async getCurrent(orgId: string): Promise<ApiResponse<FinancialYear>> {
    return apiClient.get(`/financial-year/current/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<FinancialYear>> {
    return apiClient.get(`/financial-year/${id}`);
  }

  async create(orgId: string, data: Partial<FinancialYear>): Promise<ApiResponse<FinancialYear>> {
    return apiClient.post(`/financial-year/${orgId}`, data);
  }

  async update(id: string, data: Partial<FinancialYear>): Promise<ApiResponse<FinancialYear>> {
    return apiClient.put(`/financial-year/${id}`, data);
  }

  async close(id: string): Promise<ApiResponse<FinancialYear>> {
    return apiClient.patch(`/financial-year/close/${id}`, {});
  }

  async reopen(id: string): Promise<ApiResponse<FinancialYear>> {
    return apiClient.patch(`/financial-year/reopen/${id}`, {});
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/financial-year/${id}`);
  }
}

export const financialYearService = new FinancialYearService();
