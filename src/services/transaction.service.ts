import { apiClient } from '@utils/apiClient';
import { ApiResponse, Transaction } from '@interfaces';

class TransactionService {
  async getByFinancialYear(financialYearId: string): Promise<ApiResponse<Transaction[]>> {
    return apiClient.get(`/transaction/financial-year/${financialYearId}`);
  }

  async getByFinancialYearArchived(financialYearId: string): Promise<ApiResponse<Transaction[]>> {
    return apiClient.get(`/transaction/financial-year/archived/${financialYearId}`);
  }

  async getForRange(orgId: string, dateRange: any): Promise<ApiResponse<Transaction[]>> {
    return apiClient.patch(`/transaction/range/${orgId}`, dateRange);
  }

  async getForRangeArchived(orgId: string, dateRange: any): Promise<ApiResponse<Transaction[]>> {
    return apiClient.patch(`/transaction/range/archived/${orgId}`, dateRange);
  }

  async get(id: string): Promise<ApiResponse<Transaction>> {
    return apiClient.get(`/transaction/${id}`);
  }

  async create(orgId: string, data: Partial<Transaction>): Promise<ApiResponse<Transaction>> {
    return apiClient.post(`/transaction/${orgId}`, data);
  }

  async update(id: string, data: Partial<Transaction>): Promise<ApiResponse<Transaction>> {
    return apiClient.put(`/transaction/${id}`, data);
  }

  async archive(id: string): Promise<ApiResponse<Transaction>> {
    return apiClient.patch(`/transaction/archive/${id}`, {});
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/transaction/${id}`);
  }
}

export const transactionService = new TransactionService();
