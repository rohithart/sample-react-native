import { apiClient } from '@utils/apiClient';
import { ApiResponse, Image } from '@interfaces';

class ImageService {
  async getAll(orgId: string): Promise<ApiResponse<Image[]>> {
    return apiClient.get(`/image/org/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Image>> {
    return apiClient.get(`/image/${id}`);
  }

  async upload(orgId: string, file: File, altText?: string): Promise<ApiResponse<Image>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', altText || '');
    
    return apiClient.post(`/image/${orgId}`, formData);
  }

  async uploadBatch(orgId: string, files: File[]): Promise<ApiResponse<Image[]>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    return apiClient.post(`/image/batch/${orgId}`, formData);
  }

  async update(id: string, data: Partial<Image>): Promise<ApiResponse<Image>> {
    return apiClient.put(`/image/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/image/${id}`);
  }

  async generateThumbnail(id: string, width: number, height: number): Promise<ApiResponse<string>> {
    return apiClient.get(`/image/thumbnail/${id}?width=${width}&height=${height}`);
  }
}

export const imageService = new ImageService();
