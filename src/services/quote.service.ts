import { apiClient } from '@utils/apiClient';
import { ApiResponse, Quote } from '@interfaces';

class QuoteService {
  async getAll(orgId: string): Promise<ApiResponse<Quote[]>> {
    return apiClient.get(`/quote/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Quote[]>> {
    return apiClient.get(`/quote/org/archived/${orgId}`);
  }

  async getAllForWorkFlow(workflowId: string): Promise<ApiResponse<Quote[]>> {
    return apiClient.get(`/quote/workflow/${workflowId}`);
  }

  async getAllForVendor(vendorId: string): Promise<ApiResponse<Quote[]>> {
    return apiClient.get(`/quote/vendor/${vendorId}`);
  }

  async get(id: string): Promise<ApiResponse<Quote>> {
    return apiClient.get(`/quote/${id}`);
  }

  async create(orgId: string, data: Partial<Quote>): Promise<ApiResponse<Quote>> {
    return apiClient.post(`/quote/${orgId}`, data);
  }

  async update(id: string, data: Partial<Quote>): Promise<ApiResponse<Quote>> {
    return apiClient.put(`/quote/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/quote/${id}`);
  }

  async updateStatus(id: string, status: Quote['status']): Promise<ApiResponse<Quote>> {
    return apiClient.patch(`/quote/status/${id}`, { status });
  }

  async extendQuote(id: string): Promise<ApiResponse<Quote>> {
    return apiClient.patch(`/quote/extend/${id}`, {});
  }

  async remind(id: string): Promise<ApiResponse<Quote>> {
    return apiClient.patch(`/quote/remind/${id}`, {});
  }

  async submit(id: string): Promise<ApiResponse<Quote>> {
    return apiClient.patch(`/quote/submit/${id}`, {});
  }

  async archive(id: string): Promise<ApiResponse<Quote>> {
    return apiClient.patch(`/quote/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Quote>> {
    return apiClient.patch(`/quote/unarchive/${id}`, {});
  }

  async flag(id: string, reason?: string): Promise<ApiResponse<Quote>> {
    return apiClient.patch(`/quote/flag/${id}`, { reason });
  }

  async unflag(id: string): Promise<ApiResponse<Quote>> {
    return apiClient.patch(`/quote/unflag/${id}`, {});
  }
}

export const quoteService = new QuoteService();
