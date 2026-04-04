import { apiClient } from '@utils/apiClient';
import { ApiResponse, Evidence } from '@interfaces';

class EvidenceService {
  async getAll(orgId: string): Promise<ApiResponse<Evidence[]>> {
    return apiClient.get(`/evidence/org/${orgId}`);
  }

  async getForEntity(entityId: string, entityType: string): Promise<ApiResponse<Evidence[]>> {
    return apiClient.get(`/evidence/entity/${entityId}/${entityType}`);
  }

  async get(id: string): Promise<ApiResponse<Evidence>> {
    return apiClient.get(`/evidence/${id}`);
  }

  async create(orgId: string, data: Partial<Evidence>): Promise<ApiResponse<Evidence>> {
    return apiClient.post(`/evidence/${orgId}`, data);
  }

  async update(id: string, data: Partial<Evidence>): Promise<ApiResponse<Evidence>> {
    return apiClient.put(`/evidence/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/evidence/${id}`);
  }

  async upload(orgId: string, entityId: string, entityType: string, file: File): Promise<ApiResponse<Evidence>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('entityId', entityId);
    formData.append('entityType', entityType);
    
    return apiClient.post(`/evidence/upload/${orgId}`, formData);
  }
}

export const evidenceService = new EvidenceService();
