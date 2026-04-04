import { apiClient } from '@utils/apiClient';
import { ApiResponse, Event } from '@interfaces';

class EventService {
  async getAll(orgId: string): Promise<ApiResponse<Event[]>> {
    return apiClient.get(`/event/org/${orgId}`);
  }

  async getAllUpcoming(orgId: string): Promise<ApiResponse<Event[]>> {
    return apiClient.get(`/event/upcoming/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<Event[]>> {
    return apiClient.get(`/event/archived/${orgId}`);
  }

  async getAllForUser(userId: string): Promise<ApiResponse<Event[]>> {
    return apiClient.get(`/event/user/${userId}`);
  }

  async get(id: string): Promise<ApiResponse<Event>> {
    return apiClient.get(`/event/${id}`);
  }

  async create(orgId: string, data: Partial<Event>): Promise<ApiResponse<Event>> {
    return apiClient.post(`/event/${orgId}`, data);
  }

  async update(id: string, data: Partial<Event>): Promise<ApiResponse<Event>> {
    return apiClient.put(`/event/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/event/${id}`);
  }

  async registerAttendee(id: string, userId: string): Promise<ApiResponse<Event>> {
    return apiClient.patch(`/event/register/${id}`, { userId });
  }

  async unregisterAttendee(id: string, userId: string): Promise<ApiResponse<Event>> {
    return apiClient.patch(`/event/unregister/${id}`, { userId });
  }

  async updateStatus(id: string, status: Event['status']): Promise<ApiResponse<Event>> {
    return apiClient.patch(`/event/status/${id}`, { status });
  }
}

export const eventService = new EventService();
