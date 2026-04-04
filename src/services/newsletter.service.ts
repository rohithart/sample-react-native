import { apiClient } from '@utils/apiClient';
import { ApiResponse, Newsletter } from '@interfaces';

class NewsletterService {
  async getAll(orgId: string): Promise<ApiResponse<Newsletter[]>> {
    return apiClient.get(`/newsletter/org/${orgId}`);
  }

  async getArchived(orgId: string): Promise<ApiResponse<Newsletter[]>> {
    return apiClient.get(`/newsletter/archived/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Newsletter>> {
    return apiClient.get(`/newsletter/${id}`);
  }

  async create(orgId: string, data: Partial<Newsletter>): Promise<ApiResponse<Newsletter>> {
    return apiClient.post(`/newsletter/${orgId}`, data);
  }

  async update(id: string, data: Partial<Newsletter>): Promise<ApiResponse<Newsletter>> {
    return apiClient.put(`/newsletter/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/newsletter/${id}`);
  }

  async send(id: string): Promise<ApiResponse<Newsletter>> {
    return apiClient.patch(`/newsletter/send/${id}`, {});
  }

  async archive(id: string): Promise<ApiResponse<Newsletter>> {
    return apiClient.patch(`/newsletter/archive/${id}`, {});
  }

  async preview(id: string): Promise<ApiResponse<string>> {
    return apiClient.get(`/newsletter/preview/${id}`);
  }
}

export const newsletterService = new NewsletterService();
