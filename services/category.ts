import type { Category } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const categoryKeys = {
  all: (orgId: string) => ['category', orgId] as const,
  detail: (id: string) => ['category', 'detail', id] as const,
};

const categoryApi = {
  getAll: (orgId: string) => api.get<Category[]>(`/category/org/${orgId}`),
  get: (id: string) => api.get<Category>(`/category/${id}`),
  create: (orgId: string, data: Partial<Category>) => api.post<Category>(`/category/${orgId}`, data),
  update: (id: string, data: Partial<Category>) => api.put<Category>(`/category/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/category/${id}`),
};

export function useCategorys(orgId: string) {
  return useQuery({ queryKey: categoryKeys.all(orgId), queryFn: () => categoryApi.getAll(orgId), enabled: !!orgId });
}

export function useCategory(id: string) {
  return useQuery({ queryKey: categoryKeys.detail(id), queryFn: () => categoryApi.get(id), enabled: !!id });
}

export function useCreateCategory(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Category>) => categoryApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all(orgId) }) });
}

export function useUpdateCategory(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) => categoryApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: categoryKeys.all(orgId) }); qc.invalidateQueries({ queryKey: categoryKeys.detail(id) }); } });
}

export function useDeleteCategory(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => categoryApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all(orgId) }) });
}
