import { apiClient } from '@utils/apiClient';
import { ApiResponse, Reminder } from '@interfaces';

class ReminderService {
  async getAll(orgId: string): Promise<ApiResponse<Reminder[]>> {
    return apiClient.get(`/reminder/org/${orgId}`);
  }

  async getPending(userId: string): Promise<ApiResponse<Reminder[]>> {
    return apiClient.get(`/reminder/pending/${userId}`);
  }

  async get(id: string): Promise<ApiResponse<Reminder>> {
    return apiClient.get(`/reminder/${id}`);
  }

  async create(orgId: string, data: Partial<Reminder>): Promise<ApiResponse<Reminder>> {
    return apiClient.post(`/reminder/${orgId}`, data);
  }

  async update(id: string, data: Partial<Reminder>): Promise<ApiResponse<Reminder>> {
    return apiClient.put(`/reminder/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/reminder/${id}`);
  }

  async snooze(id: string, snoozeMinutes: number): Promise<ApiResponse<Reminder>> {
    return apiClient.patch(`/reminder/snooze/${id}`, { snoozeMinutes });
  }

  async dismiss(id: string): Promise<ApiResponse<Reminder>> {
    return apiClient.patch(`/reminder/dismiss/${id}`, {});
  }

  async getForEntity(entityId: string, entityType: string): Promise<ApiResponse<Reminder[]>> {
    return apiClient.get(`/reminder/entity/${entityId}/${entityType}`);
  }
}

export const reminderService = new ReminderService();
