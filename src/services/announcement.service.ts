import { apiClient } from '@utils/apiClient';
import { ApiResponse, Announcement } from '@interfaces';

class AnnouncementService {
  async getAll(orgId: string): Promise<ApiResponse<Announcement[]>> {
    return apiClient.get(`/announcement/org/${orgId}`);
  }

  async getActive(orgId: string): Promise<ApiResponse<Announcement[]>> {
    return apiClient.get(`/announcement/active/${orgId}`);
  }

  async getArchived(orgId: string): Promise<ApiResponse<Announcement[]>> {
    return apiClient.get(`/announcement/archived/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Announcement>> {
    return apiClient.get(`/announcement/${id}`);
  }

  async create(orgId: string, data: Partial<Announcement>): Promise<ApiResponse<Announcement>> {
    return apiClient.post(`/announcement/${orgId}`, data);
  }

  async update(id: string, data: Partial<Announcement>): Promise<ApiResponse<Announcement>> {
    return apiClient.put(`/announcement/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/announcement/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<Announcement>> {
    return apiClient.patch(`/announcement/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Announcement>> {
    return apiClient.patch(`/announcement/unarchive/${id}`, {});
  }

  async updateStatus(id: string, status: Announcement['status']): Promise<ApiResponse<Announcement>> {
    return apiClient.patch(`/announcement/status/${id}`, { status });
  }
}

export const announcementService = new AnnouncementService();
