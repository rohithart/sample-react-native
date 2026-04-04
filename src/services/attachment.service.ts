import { apiClient } from '@utils/apiClient';
import { ApiResponse, Attachment } from '@interfaces';

class AttachmentService {
  async getAll(orgId: string): Promise<ApiResponse<Attachment[]>> {
    return apiClient.get(`/attachment/org/${orgId}`);
  }

  async getForEntity(entityId: string, entityType: string): Promise<ApiResponse<Attachment[]>> {
    return apiClient.get(`/attachment/entity/${entityId}/${entityType}`);
  }

  async get(id: string): Promise<ApiResponse<Attachment>> {
    return apiClient.get(`/attachment/${id}`);
  }

  async upload(orgId: string, entityId: string, entityType: string, file: File): Promise<ApiResponse<Attachment>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('entityId', entityId);
    formData.append('entityType', entityType);
    
    return apiClient.post(`/attachment/${orgId}`, formData);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/attachment/${id}`);
  }

  async download(id: string): Promise<Blob> {
    const response = await apiClient.get(`/attachment/download/${id}`, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export const attachmentService = new AttachmentService();
