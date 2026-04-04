import { apiClient } from '@utils/apiClient';
import { ApiResponse, AuthState } from '@interfaces';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: any;
}

class AuthApiService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post('/auth/login', credentials);
  }

  async register(data: any): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post('/auth/register', data);
  }

  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/logout', {});
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<{ access_token: string }>> {
    return apiClient.post('/auth/refresh', { refresh_token: refreshToken });
  }

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/reset-password', { token, new_password: newPassword });
  }

  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/verify-email', { token });
  }
}

export const authApiService = new AuthApiService();
