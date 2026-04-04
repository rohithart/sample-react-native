import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_TIMEOUT, RETRY_ATTEMPTS, TOKEN_REFRESH_THRESHOLD } from '@constants/api';
import { ApiResponse } from '@types/index';

class ApiClient {
  private instance: AxiosInstance;
  private refreshing: boolean = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.API_BASE_URL || 'https://api.example.com',
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      async (config) => {
        try {
          const token = await AsyncStorage.getItem('access_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Error setting auth token:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (!this.refreshing) {
            this.refreshing = true;
            try {
              const newToken = await this.refreshAccessToken();
              this.refreshing = false;
              this.onRefereshed(newToken);

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              return this.instance(originalRequest);
            } catch (refreshError) {
              this.refreshing = false;
              await AsyncStorage.removeItem('access_token');
              await AsyncStorage.removeItem('refresh_token');
              // Trigger logout
              throw refreshError;
            }
          }

          return new Promise((resolve) => {
            this.addRefreshSubscriber((token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(this.instance(originalRequest));
            });
          });
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.instance.post<{ access_token: string }>(
      '/auth/refresh',
      { refresh_token: refreshToken }
    );

    const newToken = response.data.access_token;
    await AsyncStorage.setItem('access_token', newToken);

    return newToken;
  }

  private onRefereshed(token: string): void {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  private addRefreshSubscriber(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback);
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get<T>(url, config);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        statusCode: error.response?.status || 500,
      };
    }
    return {
      success: false,
      error: 'An unknown error occurred',
      statusCode: 500,
    };
  }
}

export const apiClient = new ApiClient();
