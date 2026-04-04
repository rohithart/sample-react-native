import { apiClient } from '@utils/apiClient';
import { ApiResponse, Booking } from '@interfaces';

class BookingService {
  async getAll(orgId: string): Promise<ApiResponse<Booking[]>> {
    return apiClient.get(`/booking/org/${orgId}`);
  }

  async getAllForUser(userId: string): Promise<ApiResponse<Booking[]>> {
    return apiClient.get(`/booking/user/${userId}`);
  }

  async getAllForResource(resourceId: string): Promise<ApiResponse<Booking[]>> {
    return apiClient.get(`/booking/resource/${resourceId}`);
  }

  async get(id: string): Promise<ApiResponse<Booking>> {
    return apiClient.get(`/booking/${id}`);
  }

  async create(orgId: string, data: Partial<Booking>): Promise<ApiResponse<Booking>> {
    return apiClient.post(`/booking/${orgId}`, data);
  }

  async update(id: string, data: Partial<Booking>): Promise<ApiResponse<Booking>> {
    return apiClient.put(`/booking/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/booking/${id}`);
  }

  async updateStatus(id: string, status: Booking['status']): Promise<ApiResponse<Booking>> {
    return apiClient.patch(`/booking/status/${id}`, { status });
  }

  async approve(id: string): Promise<ApiResponse<Booking>> {
    return apiClient.patch(`/booking/approve/${id}`, {});
  }

  async reject(id: string, reason?: string): Promise<ApiResponse<Booking>> {
    return apiClient.patch(`/booking/reject/${id}`, { reason });
  }

  async cancel(id: string): Promise<ApiResponse<Booking>> {
    return apiClient.patch(`/booking/cancel/${id}`, {});
  }
}

export const bookingService = new BookingService();
