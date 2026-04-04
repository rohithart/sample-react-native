import { apiClient } from '@utils/apiClient';
import { ApiResponse, FirebaseConfig } from '@interfaces';

class FirebaseService {
  async getConfig(): Promise<ApiResponse<FirebaseConfig>> {
    return apiClient.get(`/firebase/config`);
  }

  async initializeMessaging(token: string): Promise<ApiResponse<{ registered: boolean }>> {
    return apiClient.post(`/firebase/messaging/init`, { token });
  }

  async getMessagingToken(userId: string): Promise<ApiResponse<{ token: string }>> {
    return apiClient.get(`/firebase/messaging/token/${userId}`);
  }

  async updateMessagingToken(userId: string, token: string): Promise<ApiResponse<void>> {
    return apiClient.put(`/firebase/messaging/token/${userId}`, { token });
  }

  async uploadFile(bucket: string, path: string, file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.post(`/firebase/storage/upload/${bucket}/${encodeURIComponent(path)}`, formData);
  }

  async deleteFile(bucket: string, path: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/firebase/storage/${bucket}/${encodeURIComponent(path)}`);
  }

  async getStorageUrl(bucket: string, path: string): Promise<ApiResponse<{ url: string }>> {
    return apiClient.get(`/firebase/storage/url/${bucket}/${encodeURIComponent(path)}`);
  }

  async verifyToken(token: string): Promise<ApiResponse<{ valid: boolean; email: string; uid: string }>> {
    return apiClient.post(`/firebase/verify-token`, { token });
  }

  async sendNotification(orgId: string, userId: string, notification: any): Promise<ApiResponse<void>> {
    return apiClient.post(`/firebase/send-notification/${orgId}/${userId}`, notification);
  }
}

export const firebaseService = new FirebaseService();
