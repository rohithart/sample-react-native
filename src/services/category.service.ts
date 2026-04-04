import { apiClient } from '@utils/apiClient';
import { ApiResponse, Category } from '@interfaces';

class CategoryService {
  async getAll(orgId: string): Promise<ApiResponse<Category[]>> {
    return apiClient.get(`/category/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Category[]>> {
    return apiClient.get(`/category/org/archived/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Category>> {
    return apiClient.get(`/category/${id}`);
  }

  async create(orgId: string, data: Partial<Category>): Promise<ApiResponse<Category>> {
    return apiClient.post(`/category/${orgId}`, data);
  }

  async update(id: string, data: Partial<Category>): Promise<ApiResponse<Category>> {
    return apiClient.put(`/category/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/category/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<Category>> {
    return apiClient.patch(`/category/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<Category>> {
    return apiClient.patch(`/category/unarchive/${id}`, {});
  }
}

export const categoryService = new CategoryService();
