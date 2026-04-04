import { apiClient } from '@utils/apiClient';
import { User, Organisation, ApiResponse, PaginatedResponse } from '@interfaces';

class UserService {
  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get('/users/profile');
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put('/users/profile', data);
  }

  async getUsers(page: number = 1, limit: number = 20): Promise<ApiResponse<PaginatedResponse<User>>> {
    return apiClient.get(`/users?page=${page}&limit=${limit}`);
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return apiClient.get(`/users/${id}`);
  }

  async createUser(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.post('/users', data);
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put(`/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/users/${id}`);
  }
}

export const userService = new UserService();
