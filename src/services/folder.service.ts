import { apiClient } from '@utils/apiClient';
import { ApiResponse, Folder } from '@interfaces';

class FolderService {
  async getAll(orgId: string): Promise<ApiResponse<Folder[]>> {
    return apiClient.get(`/folder/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Folder[]>> {
    return apiClient.get(`/folder/org/archived/${orgId}`);
  }

  async getForParent(parentFolderId: string): Promise<ApiResponse<Folder[]>> {
    return apiClient.get(`/folder/parent/${parentFolderId}`);
  }

  async get(id: string): Promise<ApiResponse<Folder>> {
    return apiClient.get(`/folder/${id}`);
  }

  async create(orgId: string, data: Partial<Folder>): Promise<ApiResponse<Folder>> {
    return apiClient.post(`/folder/${orgId}`, data);
  }

  async update(id: string, data: Partial<Folder>): Promise<ApiResponse<Folder>> {
    return apiClient.put(`/folder/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/folder/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<Folder>> {
    return apiClient.patch(`/folder/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Folder>> {
    return apiClient.patch(`/folder/unarchive/${id}`, {});
  }

  async move(id: string, parentFolderId: string): Promise<ApiResponse<Folder>> {
    return apiClient.patch(`/folder/move/${id}`, { parentFolderId });
  }
}

export const folderService = new FolderService();
