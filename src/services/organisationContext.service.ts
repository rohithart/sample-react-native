import { apiClient } from '@utils/apiClient';
import { ApiResponse, OrganisationContext } from '@interfaces';

class OrganisationContextService {
  async getCurrentOrgContext(): Promise<ApiResponse<OrganisationContext>> {
    return apiClient.get(`/organisation-context/current`);
  }

  async getOrgContext(orgId: string): Promise<ApiResponse<OrganisationContext>> {
    return apiClient.get(`/organisation-context/${orgId}`);
  }

  async updateOrgContext(orgId: string, data: Partial<OrganisationContext>): Promise<ApiResponse<OrganisationContext>> {
    return apiClient.put(`/organisation-context/${orgId}`, data);
  }

  async updateSettings(orgId: string, settings: Record<string, any>): Promise<ApiResponse<OrganisationContext>> {
    return apiClient.patch(`/organisation-context/settings/${orgId}`, settings);
  }

  async getMembers(orgId: string): Promise<ApiResponse<any[]>> {
    return apiClient.get(`/organisation-context/members/${orgId}`);
  }

  async getMemberCount(orgId: string): Promise<ApiResponse<number>> {
    return apiClient.get(`/organisation-context/member-count/${orgId}`);
  }
}

export const organisationContextService = new OrganisationContextService();
