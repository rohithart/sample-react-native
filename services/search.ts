import type { SearchResult } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { api } from './api-client';

const searchApi = {
  search: (orgId: string, data: { query: string }) => api.post<SearchResult[]>(`/api/search/${orgId}`, data),
};

export function useSearch(orgId: string) {
  return useMutation({ mutationFn: (query: string) => searchApi.search(orgId, { query }) });
}
