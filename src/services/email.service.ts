import { apiClient } from '@utils/apiClient';
import { ApiResponse, Email } from '@interfaces';

class EmailService {
  async getAll(orgId: string): Promise<ApiResponse<Email[]>> {
    return apiClient.get(`/email/org/${orgId}`);
  }

  async getSent(orgId: string): Promise<ApiResponse<Email[]>> {
    return apiClient.get(`/email/sent/${orgId}`);
  }

  async getFailed(orgId: string): Promise<ApiResponse<Email[]>> {
    return apiClient.get(`/email/failed/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Email>> {
    return apiClient.get(`/email/${id}`);
  }

  async send(orgId: string, data: Partial<Email>): Promise<ApiResponse<Email>> {
    return apiClient.post(`/email/${orgId}`, data);
  }

  async sendBatch(orgId: string, emails: Partial<Email>[]): Promise<ApiResponse<Email[]>> {
    return apiClient.post(`/email/batch/${orgId}`, { emails });
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/email/${id}`);
  }

  async retry(id: string): Promise<ApiResponse<Email>> {
    return apiClient.patch(`/email/retry/${id}`, {});
  }
}

export const emailService = new EmailService();
