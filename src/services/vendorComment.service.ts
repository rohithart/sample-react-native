import { apiClient } from '@utils/apiClient';
import { ApiResponse, VendorComment } from '@interfaces';

class VendorCommentService {
  async getAll(vendorId: string): Promise<ApiResponse<VendorComment[]>> {
    return apiClient.get(`/vendor-comment/vendor/${vendorId}`);
  }

  async get(id: string): Promise<ApiResponse<VendorComment>> {
    return apiClient.get(`/vendor-comment/${id}`);
  }

  async create(vendorId: string, data: Partial<VendorComment>): Promise<ApiResponse<VendorComment>> {
    return apiClient.post(`/vendor-comment/vendor/${vendorId}`, data);
  }

  async update(id: string, data: Partial<VendorComment>): Promise<ApiResponse<VendorComment>> {
    return apiClient.put(`/vendor-comment/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/vendor-comment/${id}`);
  }

  async getAverageRating(vendorId: string): Promise<ApiResponse<{ rating: number; count: number }>> {
    return apiClient.get(`/vendor-comment/rating/${vendorId}`);
  }
}

export const vendorCommentService = new VendorCommentService();
