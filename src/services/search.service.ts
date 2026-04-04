import { apiClient } from '@utils/apiClient';
import { ApiResponse, SearchResult } from '@interfaces';

class SearchService {
  async search(orgId: string, query: string): Promise<ApiResponse<SearchResult[]>> {
    return apiClient.get(`/search/${orgId}?q=${encodeURIComponent(query)}`);
  }

  async searchByType(orgId: string, query: string, entityType: string): Promise<ApiResponse<SearchResult[]>> {
    return apiClient.get(`/search/${orgId}?q=${encodeURIComponent(query)}&type=${entityType}`);
  }

  async advancedSearch(orgId: string, filters: Record<string, any>): Promise<ApiResponse<SearchResult[]>> {
    return apiClient.post(`/search/advanced/${orgId}`, filters);
  }

  async getSuggestions(orgId: string, query: string): Promise<ApiResponse<string[]>> {
    return apiClient.get(`/search/suggestions/${orgId}?q=${encodeURIComponent(query)}`);
  }

  async saveSearch(orgId: string, name: string, query: string, filters: any): Promise<ApiResponse<any>> {
    return apiClient.post(`/search/saved/${orgId}`, { name, query, filters });
  }

  async getSavedSearches(orgId: string): Promise<ApiResponse<any[]>> {
    return apiClient.get(`/search/saved/${orgId}`);
  }

  async deleteSavedSearch(searchId: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/search/saved/${searchId}`);
  }
}

export const searchService = new SearchService();
