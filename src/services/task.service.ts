import { apiClient } from '@utils/apiClient';
import { ApiResponse, Task } from '@interfaces';

class TaskService {
  async getAll(orgId: string): Promise<ApiResponse<Task[]>> {
    return apiClient.get(`/task/org/${orgId}`);
  }

  async getAllForUser(orgId: string, userId: string): Promise<ApiResponse<Task[]>> {
    return apiClient.get(`/task/org/${orgId}/user/${userId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Task[]>> {
    return apiClient.get(`/task/org/archived/${orgId}`);
  }

  async getAllForWorkFlow(workflowId: string): Promise<ApiResponse<Task[]>> {
    return apiClient.get(`/task/workflow/${workflowId}`);
  }

  async get(id: string): Promise<ApiResponse<Task>> {
    return apiClient.get(`/task/${id}`);
  }

  async create(orgId: string, data: Partial<Task>): Promise<ApiResponse<Task>> {
    return apiClient.post(`/task/${orgId}`, data);
  }

  async update(id: string, data: Partial<Task>): Promise<ApiResponse<Task>> {
    return apiClient.put(`/task/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/task/${id}`);
  }

  async updateStatus(id: string, status: Task['status']): Promise<ApiResponse<Task>> {
    return apiClient.patch(`/task/status/${id}`, { status });
  }

  async updateUser(id: string, userId: string): Promise<ApiResponse<Task>> {
    return apiClient.patch(`/task/user/${id}`, { userId });
  }

  async archive(id: string): Promise<ApiResponse<Task>> {
    return apiClient.patch(`/task/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Task>> {
    return apiClient.patch(`/task/unarchive/${id}`, {});
  }

  async flag(id: string, reason?: string): Promise<ApiResponse<Task>> {
    return apiClient.patch(`/task/flag/${id}`, { reason });
  }

  async unflag(id: string): Promise<ApiResponse<Task>> {
    return apiClient.patch(`/task/unflag/${id}`, {});
  }
}

export const taskService = new TaskService();
