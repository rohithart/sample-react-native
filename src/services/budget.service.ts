import { apiClient } from '@utils/apiClient';
import { ApiResponse, Budget } from '@interfaces';

class BudgetService {
  async getAll(orgId: string): Promise<ApiResponse<Budget[]>> {
    return apiClient.get(`/budget/org/${orgId}`);
  }

  async getForFinancialYear(financialYearId: string): Promise<ApiResponse<Budget[]>> {
    return apiClient.get(`/budget/financial-year/${financialYearId}`);
  }

  async get(id: string): Promise<ApiResponse<Budget>> {
    return apiClient.get(`/budget/${id}`);
  }

  async create(orgId: string, data: Partial<Budget>): Promise<ApiResponse<Budget>> {
    return apiClient.post(`/budget/${orgId}`, data);
  }

  async update(id: string, data: Partial<Budget>): Promise<ApiResponse<Budget>> {
    return apiClient.put(`/budget/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/budget/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<Budget>> {
    return apiClient.patch(`/budget/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Budget>> {
    return apiClient.patch(`/budget/unarchive/${id}`, {});
  }

  async updateSpent(id: string, amount: number): Promise<ApiResponse<Budget>> {
    return apiClient.patch(`/budget/spent/${id}`, { amount });
  }
}

export const budgetService = new BudgetService();
