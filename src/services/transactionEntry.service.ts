import { apiClient } from '@utils/apiClient';
import { ApiResponse, TransactionEntry } from '@interfaces';

class TransactionEntryService {
  async getAll(orgId: string): Promise<ApiResponse<TransactionEntry[]>> {
    return apiClient.get(`/transaction-entry/org/${orgId}`);
  }

  async getForTransaction(transactionId: string): Promise<ApiResponse<TransactionEntry[]>> {
    return apiClient.get(`/transaction-entry/transaction/${transactionId}`);
  }

  async get(id: string): Promise<ApiResponse<TransactionEntry>> {
    return apiClient.get(`/transaction-entry/${id}`);
  }

  async create(orgId: string, data: Partial<TransactionEntry>): Promise<ApiResponse<TransactionEntry>> {
    return apiClient.post(`/transaction-entry/${orgId}`, data);
  }

  async update(id: string, data: Partial<TransactionEntry>): Promise<ApiResponse<TransactionEntry>> {
    return apiClient.put(`/transaction-entry/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/transaction-entry/${id}`);
  }
}

export const transactionEntryService = new TransactionEntryService();
