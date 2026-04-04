import { apiClient } from '@utils/apiClient';
import { ApiResponse, VendorSubmission } from '@interfaces';

class VendorSubmitService {
  async getAll(vendorId: string): Promise<ApiResponse<VendorSubmission[]>> {
    return apiClient.get(`/vendor-submit/vendor/${vendorId}`);
  }

  async getPending(orgId: string): Promise<ApiResponse<VendorSubmission[]>> {
    return apiClient.get(`/vendor-submit/pending/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<VendorSubmission>> {
    return apiClient.get(`/vendor-submit/${id}`);
  }

  async submit(
    vendorId: string,
    submissionType: string,
    data: Record<string, any>
  ): Promise<ApiResponse<VendorSubmission>> {
    return apiClient.post(`/vendor-submit/vendor/${vendorId}`, { submissionType, data });
  }

  async approve(id: string, comments?: string): Promise<ApiResponse<VendorSubmission>> {
    return apiClient.patch(`/vendor-submit/approve/${id}`, { comments });
  }

  async reject(id: string, reason: string): Promise<ApiResponse<VendorSubmission>> {
    return apiClient.patch(`/vendor-submit/reject/${id}`, { reason });
  }

  async resubmit(id: string, data: Record<string, any>): Promise<ApiResponse<VendorSubmission>> {
    return apiClient.patch(`/vendor-submit/resubmit/${id}`, { data });
  }
}

export const vendorSubmitService = new VendorSubmitService();
