import { apiClient } from '@utils/apiClient';
import { ApiResponse, AssetType } from '@interfaces';

class AssetTypeService {
  async getAll(orgId: string): Promise<ApiResponse<AssetType[]>> {
    return apiClient.get(`/asset-type/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<AssetType[]>> {
    return apiClient.get(`/asset-type/org/archived/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<AssetType>> {
    return apiClient.get(`/asset-type/${id}`);
  }

  async create(orgId: string, data: Partial<AssetType>): Promise<ApiResponse<AssetType>> {
    return apiClient.post(`/asset-type/${orgId}`, data);
  }

  async update(id: string, data: Partial<AssetType>): Promise<ApiResponse<AssetType>> {
    return apiClient.put(`/asset-type/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/asset-type/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<AssetType>> {
    return apiClient.patch(`/asset-type/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<AssetType>> {
    return apiClient.patch(`/asset-type/unarchive/${id}`, {});
  }
}

export const assetTypeService = new AssetTypeService();
