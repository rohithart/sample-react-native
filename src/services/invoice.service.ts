import { apiClient } from '@utils/apiClient';
import { ApiResponse, Invoice } from '@interfaces';

class InvoiceService {
  async getAll(orgId: string): Promise<ApiResponse<Invoice[]>> {
    return apiClient.get(`/invoice/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Invoice[]>> {
    return apiClient.get(`/invoice/org/archived/${orgId}`);
  }

  async getAllForWorkFlow(workflowId: string): Promise<ApiResponse<Invoice[]>> {
    return apiClient.get(`/invoice/workflow/${workflowId}`);
  }

  async getAllForVendor(vendorId: string): Promise<ApiResponse<Invoice[]>> {
    return apiClient.get(`/invoice/vendor/${vendorId}`);
  }

  async getAllForQuote(quoteId: string): Promise<ApiResponse<Invoice[]>> {
    return apiClient.get(`/invoice/quote/${quoteId}`);
  }

  async getAllForWorkorder(workorderId: string): Promise<ApiResponse<Invoice[]>> {
    return apiClient.get(`/invoice/workorder/${workorderId}`);
  }

  async get(id: string): Promise<ApiResponse<Invoice>> {
    return apiClient.get(`/invoice/${id}`);
  }

  async create(orgId: string, data: Partial<Invoice>): Promise<ApiResponse<Invoice>> {
    return apiClient.post(`/invoice/${orgId}`, data);
  }

  async update(id: string, data: Partial<Invoice>): Promise<ApiResponse<Invoice>> {
    return apiClient.put(`/invoice/${id}`, data);
  }

  async createForQuote(quoteId: string): Promise<ApiResponse<Invoice>> {
    return apiClient.post(`/invoice/quote/${quoteId}`, {});
  }

  async createForWorkorder(workorderId: string): Promise<ApiResponse<Invoice>> {
    return apiClient.post(`/invoice/workorder/${workorderId}`, {});
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/invoice/${id}`);
  }

  async updateStatus(id: string, status: Invoice['status']): Promise<ApiResponse<Invoice>> {
    return apiClient.patch(`/invoice/status/${id}`, { status });
  }

  async submit(id: string): Promise<ApiResponse<Invoice>> {
    return apiClient.patch(`/invoice/submit/${id}`, {});
  }

  async remind(id: string): Promise<ApiResponse<Invoice>> {
    return apiClient.patch(`/invoice/remind/${id}`, {});
  }

  async archive(id: string): Promise<ApiResponse<Invoice>> {
    return apiClient.patch(`/invoice/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Invoice>> {
    return apiClient.patch(`/invoice/unarchive/${id}`, {});
  }

  async flag(id: string, reason?: string): Promise<ApiResponse<Invoice>> {
    return apiClient.patch(`/invoice/flag/${id}`, { reason });
  }

  async unflag(id: string): Promise<ApiResponse<Invoice>> {
    return apiClient.patch(`/invoice/unflag/${id}`, {});
  }
}

export const invoiceService = new InvoiceService();
