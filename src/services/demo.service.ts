import { apiClient } from '@utils/apiClient';
import { ApiResponse, DemoData } from '@interfaces';

class DemoService {
  async generateSampleData(orgId: string, dataTypes: string[]): Promise<ApiResponse<DemoData[]>> {
    return apiClient.post(`/demo/generate/${orgId}`, { dataTypes });
  }

  async generateUsers(orgId: string, count: number): Promise<ApiResponse<any[]>> {
    return apiClient.post(`/demo/users/${orgId}`, { count });
  }

  async generateInvoices(orgId: string, count: number): Promise<ApiResponse<any[]>> {
    return apiClient.post(`/demo/invoices/${orgId}`, { count });
  }

  async generateTasks(orgId: string, count: number): Promise<ApiResponse<any[]>> {
    return apiClient.post(`/demo/tasks/${orgId}`, { count });
  }

  async generateTransactions(orgId: string, count: number): Promise<ApiResponse<any[]>> {
    return apiClient.post(`/demo/transactions/${orgId}`, { count });
  }

  async clearDemoData(orgId: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/demo/${orgId}`);
  }

  async getDemoStatus(orgId: string): Promise<ApiResponse<Record<string, number>>> {
    return apiClient.get(`/demo/status/${orgId}`);
  }
}

export const demoService = new DemoService();
