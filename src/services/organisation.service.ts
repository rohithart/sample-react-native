import { apiClient } from '@utils/apiClient';
import { Organisation, OrganisationMember, ApiResponse, PaginatedResponse } from '@interfaces';

class OrganisationService {
  async getOrganisations(): Promise<ApiResponse<Organisation[]>> {
    return apiClient.get('/organisations');
  }

  async getOrganisationById(id: string): Promise<ApiResponse<Organisation>> {
    return apiClient.get(`/organisations/${id}`);
  }

  async createOrganisation(data: Partial<Organisation>): Promise<ApiResponse<Organisation>> {
    return apiClient.post('/organisations', data);
  }

  async updateOrganisation(id: string, data: Partial<Organisation>): Promise<ApiResponse<Organisation>> {
    return apiClient.put(`/organisations/${id}`, data);
  }

  async deleteOrganisation(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/organisations/${id}`);
  }

  async getOrganisationMembers(id: string): Promise<ApiResponse<PaginatedResponse<any>>> {
    return apiClient.get(`/organisations/${id}/members`);
  }
}

export const organisationService = new OrganisationService();
