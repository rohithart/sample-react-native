import { apiClient } from '@utils/apiClient';
import { ApiResponse, BookingType } from '@interfaces';

class BookingTypeService {
  async getAll(orgId: string): Promise<ApiResponse<BookingType[]>> {
    return apiClient.get(`/booking-type/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<BookingType[]>> {
    return apiClient.get(`/booking-type/org/archived/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<BookingType>> {
    return apiClient.get(`/booking-type/${id}`);
  }

  async create(orgId: string, data: Partial<BookingType>): Promise<ApiResponse<BookingType>> {
    return apiClient.post(`/booking-type/${orgId}`, data);
  }

  async update(id: string, data: Partial<BookingType>): Promise<ApiResponse<BookingType>> {
    return apiClient.put(`/booking-type/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/booking-type/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<BookingType>> {
    return apiClient.patch(`/booking-type/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<BookingType>> {
    return apiClient.patch(`/booking-type/unarchive/${id}`, {});
  }
}

export const bookingTypeService = new BookingTypeService();
