import { apiClient } from '@utils/apiClient';
import { ApiResponse, Meeting } from '@interfaces';

class MeetingService {
  async getAll(orgId: string): Promise<ApiResponse<Meeting[]>> {
    return apiClient.get(`/meeting/org/${orgId}`);
  }

  async getAllForUser(userId: string): Promise<ApiResponse<Meeting[]>> {
    return apiClient.get(`/meeting/user/${userId}`);
  }

  async getUpcoming(orgId: string): Promise<ApiResponse<Meeting[]>> {
    return apiClient.get(`/meeting/upcoming/${orgId}`);
  }

  async get(id: string): Promise<ApiResponse<Meeting>> {
    return apiClient.get(`/meeting/${id}`);
  }

  async create(orgId: string, data: Partial<Meeting>): Promise<ApiResponse<Meeting>> {
    return apiClient.post(`/meeting/${orgId}`, data);
  }

  async update(id: string, data: Partial<Meeting>): Promise<ApiResponse<Meeting>> {
    return apiClient.put(`/meeting/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/meeting/${id}`);
  }

  async updateStatus(id: string, status: Meeting['status']): Promise<ApiResponse<Meeting>> {
    return apiClient.patch(`/meeting/status/${id}`, { status });
  }

  async addAttendee(id: string, userId: string): Promise<ApiResponse<Meeting>> {
    return apiClient.patch(`/meeting/add-attendee/${id}`, { userId });
  }

  async removeAttendee(id: string, userId: string): Promise<ApiResponse<Meeting>> {
    return apiClient.patch(`/meeting/remove-attendee/${id}`, { userId });
  }

  async recordMeeting(id: string, recordingUrl: string): Promise<ApiResponse<Meeting>> {
    return apiClient.patch(`/meeting/record/${id}`, { recordingUrl });
  }
}

export const meetingService = new MeetingService();
