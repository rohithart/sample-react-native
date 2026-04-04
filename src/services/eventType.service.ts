import { apiClient } from '@utils/apiClient';
import { ApiResponse, EventType } from '@interfaces';

class EventTypeService {
  async getAll(orgId: string): Promise<ApiResponse<EventType[]>> {
    return apiClient.get(`/event-type/org/${orgId}`);
  }

  async getAllArchived(orgId: string): Promise<ApiResponse<EventType[]>> {
    return apiClient.get(`/event-type/org/archived/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<EventType>> {
    return apiClient.get(`/event-type/${id}`);
  }

  async create(orgId: string, data: Partial<EventType>): Promise<ApiResponse<EventType>> {
    return apiClient.post(`/event-type/${orgId}`, data);
  }

  async update(id: string, data: Partial<EventType>): Promise<ApiResponse<EventType>> {
    return apiClient.put(`/event-type/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/event-type/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<EventType>> {
    return apiClient.patch(`/event-type/archive/${id}`, {});
  }

  async unarchive(id: string): Promise<ApiResponse<EventType>> {
    return apiClient.patch(`/event-type/unarchive/${id}`, {});
  }
}

export const eventTypeService = new EventTypeService();
