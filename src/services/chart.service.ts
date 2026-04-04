import { apiClient } from '@utils/apiClient';
import { ApiResponse, ChartConfig } from '@interfaces';

class ChartService {
  async getAll(orgId: string): Promise<ApiResponse<ChartConfig[]>> {
    return apiClient.get(`/chart/org/${orgId}`);
  }

  async getPublic(orgId: string): Promise<ApiResponse<ChartConfig[]>> {
    return apiClient.get(`/chart/public/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<ChartConfig>> {
    return apiClient.get(`/chart/${id}`);
  }

  async create(orgId: string, data: Partial<ChartConfig>): Promise<ApiResponse<ChartConfig>> {
    return apiClient.post(`/chart/${orgId}`, data);
  }

  async update(id: string, data: Partial<ChartConfig>): Promise<ApiResponse<ChartConfig>> {
    return apiClient.put(`/chart/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/chart/${id}`);
  }

  async getChartData(id: string, params?: any): Promise<ApiResponse<any>> {
    return apiClient.get(`/chart/data/${id}`, { params });
  }

  async exportChart(id: string, format: 'png' | 'pdf' | 'json'): Promise<Blob> {
    const response = await apiClient.get(`/chart/export/${id}?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  }

  async archive(id: string): Promise<ApiResponse<ChartConfig>> {
    return apiClient.patch(`/chart/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<ChartConfig>> {
    return apiClient.patch(`/chart/unarchive/${id}`, {});
  }
}

export const chartService = new ChartService();
