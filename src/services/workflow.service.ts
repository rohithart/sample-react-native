import { apiClient } from '@utils/apiClient';
import { ApiResponse, Workflow } from '@interfaces';

class WorkflowService {
  async getAll(orgId: string): Promise<ApiResponse<Workflow[]>> {
    return apiClient.get(`/workflow/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Workflow[]>> {
    return apiClient.get(`/workflow/org/archived/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Workflow>> {
    return apiClient.get(`/workflow/${id}`);
  }

  async create(orgId: string, data: Partial<Workflow>): Promise<ApiResponse<Workflow>> {
    return apiClient.post(`/workflow/${orgId}`, data);
  }

  async update(id: string, data: Partial<Workflow>): Promise<ApiResponse<Workflow>> {
    return apiClient.put(`/workflow/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/workflow/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<Workflow>> {
    return apiClient.patch(`/workflow/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Workflow>> {
    return apiClient.patch(`/workflow/unarchive/${id}`, {});
  }

  async updateSteps(id: string, steps: any[]): Promise<ApiResponse<Workflow>> {
    return apiClient.patch(`/workflow/steps/${id}`, { steps });
  }
}

export const workflowService = new WorkflowService();
