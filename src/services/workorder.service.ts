import { apiClient } from '@utils/apiClient';
import { ApiResponse, Workorder } from '@interfaces';

class WorkorderService {
  async getAll(orgId: string): Promise<ApiResponse<Workorder[]>> {
    return apiClient.get(`/workorder/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Workorder[]>> {
    return apiClient.get(`/workorder/org/archived/${orgId}`);
  }

  async getAllForWorkFlow(workflowId: string): Promise<ApiResponse<Workorder[]>> {
    return apiClient.get(`/workorder/workflow/${workflowId}`);
  }

  async getAllForVendor(vendorId: string): Promise<ApiResponse<Workorder[]>> {
    return apiClient.get(`/workorder/vendor/${vendorId}`);
  }

  async getAllForQuote(quoteId: string): Promise<ApiResponse<Workorder[]>> {
    return apiClient.get(`/workorder/quote/${quoteId}`);
  }

  async get(id: string): Promise<ApiResponse<Workorder>> {
    return apiClient.get(`/workorder/${id}`);
  }

  async create(orgId: string, data: Partial<Workorder>): Promise<ApiResponse<Workorder>> {
    return apiClient.post(`/workorder/${orgId}`, data);
  }

  async update(id: string, data: Partial<Workorder>): Promise<ApiResponse<Workorder>> {
    return apiClient.put(`/workorder/${id}`, data);
  }

  async createForQuote(quoteId: string): Promise<ApiResponse<Workorder>> {
    return apiClient.post(`/workorder/quote/${quoteId}`, {});
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/workorder/${id}`);
  }

  async updateStatus(id: string, status: Workorder['status']): Promise<ApiResponse<Workorder>> {
    return apiClient.patch(`/workorder/status/${id}`, { status });
  }

  async submit(id: string): Promise<ApiResponse<Workorder>> {
    return apiClient.patch(`/workorder/submit/${id}`, {});
  }

  async remind(id: string): Promise<ApiResponse<Workorder>> {
    return apiClient.patch(`/workorder/remind/${id}`, {});
  }

  async archive(id: string): Promise<ApiResponse<Workorder>> {
    return apiClient.patch(`/workorder/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Workorder>> {
    return apiClient.patch(`/workorder/unarchive/${id}`, {});
  }

  async flag(id: string, reason?: string): Promise<ApiResponse<Workorder>> {
    return apiClient.patch(`/workorder/flag/${id}`, { reason });
  }

  async unflag(id: string): Promise<ApiResponse<Workorder>> {
    return apiClient.patch(`/workorder/unflag/${id}`, {});
  }
}

export const workorderService = new WorkorderService();
