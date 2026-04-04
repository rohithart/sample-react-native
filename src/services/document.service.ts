import { apiClient } from '@utils/apiClient';
import { ApiResponse, DocumentStore } from '@interfaces';

class DocumentService {
  async getAll(orgId: string): Promise<ApiResponse<DocumentStore[]>> {
    return apiClient.get(`/document/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<DocumentStore[]>> {
    return apiClient.get(`/document/org/archived/${orgId}`);
  }

  async getAllFolder(folderId: string): Promise<ApiResponse<DocumentStore[]>> {
    return apiClient.get(`/document/folder/${folderId}`);
  }

  async getAllArchivedFolder(folderId: string): Promise<ApiResponse<DocumentStore[]>> {
    return apiClient.get(`/document/folder/archived/${folderId}`);
  }

  async get(id: string): Promise<ApiResponse<DocumentStore>> {
    return apiClient.get(`/document/${id}`);
  }

  async create(orgId: string, data: FormData | Partial<DocumentStore>): Promise<ApiResponse<DocumentStore>> {
    if (data instanceof FormData) {
      return apiClient.post(`/document/${orgId}`, data);
    }
    return apiClient.post(`/document/${orgId}`, data);
  }

  async update(id: string, data: Partial<DocumentStore>): Promise<ApiResponse<DocumentStore>> {
    return apiClient.put(`/document/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/document/${id}`);
  }

  async move(id: string, folderId: string): Promise<ApiResponse<DocumentStore>> {
    return apiClient.patch(`/document/move/${id}`, { folderId });
  }

  async archive(id: string): Promise<ApiResponse<DocumentStore>> {
    return apiClient.patch(`/document/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<DocumentStore>> {
    return apiClient.patch(`/document/unarchive/${id}`, {});
  }

  async flag(id: string, reason?: string): Promise<ApiResponse<DocumentStore>> {
    return apiClient.patch(`/document/flag/${id}`, { reason });
  }

  async unflag(id: string): Promise<ApiResponse<DocumentStore>> {
    return apiClient.patch(`/document/unflag/${id}`, {});
  }
}

export const documentService = new DocumentService();
