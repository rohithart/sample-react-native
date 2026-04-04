import { apiClient } from '@utils/apiClient';
import { ApiResponse, Vendor } from '@interfaces';

class VendorService {
  async getAll(orgId: string): Promise<ApiResponse<Vendor[]>> {
    return apiClient.get(`/vendor/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Vendor[]>> {
    return apiClient.get(`/vendor/org/archived/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Vendor>> {
    return apiClient.get(`/vendor/${id}`);
  }

  async create(orgId: string, data: Partial<Vendor>): Promise<ApiResponse<Vendor>> {
    return apiClient.post(`/vendor/${orgId}`, data);
  }

  async edit(id: string, data: Partial<Vendor>): Promise<ApiResponse<Vendor>> {
    return apiClient.put(`/vendor/${id}`, data);
  }

  async archive(id: string): Promise<ApiResponse<Vendor>> {
    return apiClient.patch(`/vendor/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Vendor>> {
    return apiClient.patch(`/vendor/unarchive/${id}`, {});
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/vendor/${id}`);
  }
}

export const vendorService = new VendorService();
