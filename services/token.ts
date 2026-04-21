import type { Token } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const tokenKeys = { all: ['tokens'] as const };

const tokenApi = {
  get: () => api.get<Token[]>('/api/token'),
  create: (data: Partial<Token>) => api.post<Token>('/api/token', data),
  delete: (id: string) => api.delete<boolean>(`/api/token/${id}`),
};

export function useTokens() {
  return useQuery({ queryKey: tokenKeys.all, queryFn: tokenApi.get });
}

export function useCreateToken() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Token>) => tokenApi.create(data), onSuccess: () => qc.invalidateQueries({ queryKey: tokenKeys.all }) });
}

export function useDeleteToken() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => tokenApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: tokenKeys.all }) });
}
