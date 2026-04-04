import { apiClient } from '@utils/apiClient';
import { ApiResponse, Group } from '@interfaces';

class GroupService {
  async getAll(orgId: string): Promise<ApiResponse<Group[]>> {
    return apiClient.get(`/group/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Group[]>> {
    return apiClient.get(`/group/org/archived/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Group>> {
    return apiClient.get(`/group/${id}`);
  }

  async create(orgId: string, data: Partial<Group>): Promise<ApiResponse<Group>> {
    return apiClient.post(`/group/${orgId}`, data);
  }

  async update(id: string, data: Partial<Group>): Promise<ApiResponse<Group>> {
    return apiClient.put(`/group/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/group/${id}`);
  }

  async addMember(id: string, userId: string): Promise<ApiResponse<Group>> {
    return apiClient.patch(`/group/add-member/${id}`, { userId });
  }

  async removeMember(id: string, userId: string): Promise<ApiResponse<Group>> {
    return apiClient.patch(`/group/remove-member/${id}`, { userId });
  }

  async archive(id: string): Promise<ApiResponse<Group>> {
    return apiClient.patch(`/group/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Group>> {
    return apiClient.patch(`/group/unarchive/${id}`, {});
  }
}

export const groupService = new GroupService();
