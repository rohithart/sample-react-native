import { apiClient } from '@utils/apiClient';
import { ApiResponse, Asset } from '@interfaces';

class AssetService {
  async getAll(orgId: string): Promise<ApiResponse<Asset[]>> {
    return apiClient.get(`/asset/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Asset[]>> {
    return apiClient.get(`/asset/org/archived/${orgId}`);
  }

  async getAllForType(assetTypeId: string): Promise<ApiResponse<Asset[]>> {
    return apiClient.get(`/asset/type/${assetTypeId}`);
  }

  async get(id: string): Promise<ApiResponse<Asset>> {
    return apiClient.get(`/asset/${id}`);
  }

  async create(orgId: string, data: Partial<Asset>): Promise<ApiResponse<Asset>> {
    return apiClient.post(`/asset/${orgId}`, data);
  }

  async update(id: string, data: Partial<Asset>): Promise<ApiResponse<Asset>> {
    return apiClient.put(`/asset/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/asset/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<Asset>> {
    return apiClient.patch(`/asset/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Asset>> {
    return apiClient.patch(`/asset/unarchive/${id}`, {});
  }

  async updateStatus(id: string, status: Asset['status']): Promise<ApiResponse<Asset>> {
    return apiClient.patch(`/asset/status/${id}`, { status });
  }
}

export const assetService = new AssetService();
