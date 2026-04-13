import type { FinancialYear } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const fyKeys = {
  all: (orgId: string) => ['fy', orgId] as const,
  current: (orgId: string) => ['fy', orgId, 'current'] as const,
  detail: (id: string) => ['fy', 'detail', id] as const,
};

const fyApi = {
  getAll: (orgId: string) => api.get<FinancialYear[]>(`/financial-year/org/${orgId}`),
  getCurrent: (orgId: string) => api.get<FinancialYear>(`/financial-year/current/${orgId}`),
  get: (id: string) => api.get<FinancialYear>(`/financial-year/${id}`),
  getDetails: (id: string) => api.get<any>(`/financial-year/details/${id}`),
  create: (orgId: string, data: Partial<FinancialYear>) => api.post<FinancialYear>(`/financial-year/${orgId}`, data),
  setCurrent: (id: string) => api.put<FinancialYear>(`/financial-year/${id}`, {}),
  delete: (id: string) => api.delete<boolean>(`/financial-year/${id}`),
};

export function useFinancialYears(orgId: string) {
  return useQuery({ queryKey: fyKeys.all(orgId), queryFn: () => fyApi.getAll(orgId), enabled: !!orgId });
}

export function useCurrentFinancialYear(orgId: string) {
  return useQuery({ queryKey: fyKeys.current(orgId), queryFn: () => fyApi.getCurrent(orgId), enabled: !!orgId });
}

export function useFinancialYear(id: string) {
  return useQuery({ queryKey: fyKeys.detail(id), queryFn: () => fyApi.get(id), enabled: !!id });
}

export function useCreateFinancialYear(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<FinancialYear>) => fyApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: fyKeys.all(orgId) }) });
}

export function useDeleteFinancialYear(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => fyApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: fyKeys.all(orgId) }) });
}
