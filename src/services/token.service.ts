import { apiClient } from '@utils/apiClient';
import { ApiResponse, Token } from '@interfaces';

class TokenService {
  async getAll(orgId: string): Promise<ApiResponse<Token[]>> {
    return apiClient.get(`/token/org/${orgId}`);
  }

  async getUserTokens(userId: string): Promise<ApiResponse<Token[]>> {
    return apiClient.get(`/token/user/${userId}`);
  }

  async get(id: string): Promise<ApiResponse<Token>> {
    return apiClient.get(`/token/${id}`);
  }

  async create(orgId: string, name: string, expiresIn?: number): Promise<ApiResponse<Token>> {
    return apiClient.post(`/token/${orgId}`, { name, expiresIn });
  }

  async revoke(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/token/${id}`);
  }

  async revokeAll(userId: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/token/user/${userId}`);
  }

  async validateToken(token: string): Promise<ApiResponse<{ valid: boolean; userId: string; orgId: string }>> {
    return apiClient.post(`/token/validate`, { token });
  }

  async refreshToken(token: string): Promise<ApiResponse<Token>> {
    return apiClient.post(`/token/refresh`, { token });
  }
}

export const tokenService = new TokenService();
