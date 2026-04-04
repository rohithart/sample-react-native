import { apiClient } from '@utils/apiClient';
import { ApiResponse, Tour, TourStep } from '@interfaces';

class TourService {
  async getAll(orgId: string): Promise<ApiResponse<Tour[]>> {
    return apiClient.get(`/tour/org/${orgId}`);
  }

  async getPublished(orgId: string): Promise<ApiResponse<Tour[]>> {
    return apiClient.get(`/tour/published/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Tour>> {
    return apiClient.get(`/tour/${id}`);
  }

  async create(orgId: string, data: Partial<Tour>): Promise<ApiResponse<Tour>> {
    return apiClient.post(`/tour/${orgId}`, data);
  }

  async update(id: string, data: Partial<Tour>): Promise<ApiResponse<Tour>> {
    return apiClient.put(`/tour/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/tour/${id}`);
  }

  async publish(id: string): Promise<ApiResponse<Tour>> {
    return apiClient.patch(`/tour/publish/${id}`, {});
  }

  async unpublish(id: string): Promise<ApiResponse<Tour>> {
    return apiClient.patch(`/tour/unpublish/${id}`, {});
  }

  async addStep(tourId: string, step: TourStep): Promise<ApiResponse<Tour>> {
    return apiClient.post(`/tour/${tourId}/steps`, step);
  }

  async updateStep(tourId: string, stepId: string, step: Partial<TourStep>): Promise<ApiResponse<Tour>> {
    return apiClient.put(`/tour/${tourId}/steps/${stepId}`, step);
  }

  async deleteStep(tourId: string, stepId: string): Promise<ApiResponse<Tour>> {
    return apiClient.delete(`/tour/${tourId}/steps/${stepId}`);
  }
}

export const tourService = new TourService();
