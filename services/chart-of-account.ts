import type { ChartOfAccount } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const coaKeys = {
  all: (orgId: string) => ['coa', orgId] as const,
  detail: (id: string) => ['coa', 'detail', id] as const,
  forFY: (fyId: string, orgId: string) => ['coa', 'fy', fyId, orgId] as const,
  seed: (orgId: string) => ['coa', 'seed', orgId] as const,
};

const coaApi = {
  getAll: (orgId: string) => api.get<ChartOfAccount[]>(`/chart-of-account/org/${orgId}`),
  get: (id: string) => api.get<ChartOfAccount>(`/chart-of-account/${id}`),
  create: (orgId: string, data: Partial<ChartOfAccount>) => api.post<ChartOfAccount>(`/chart-of-account/${orgId}`, data),
  update: (id: string, data: Partial<ChartOfAccount>) => api.put<ChartOfAccount>(`/chart-of-account/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/chart-of-account/${id}`),
  getByFinancialYear: (fyId: string, orgId: string) => api.get<ChartOfAccount[]>(`/chart-of-account/financial-year/${fyId}/${orgId}`),
  getSeed: (orgId: string) => api.get<any>(`/chart-of-account/seed/${orgId}`),
  setSeed: (orgId: string, data: any) => api.post<any>(`/chart-of-account/seed/${orgId}`, data),
};

export function useChartOfAccounts(orgId: string) {
  return useQuery({ queryKey: coaKeys.all(orgId), queryFn: () => coaApi.getAll(orgId), enabled: !!orgId });
}

export function useChartOfAccount(id: string) {
  return useQuery({ queryKey: coaKeys.detail(id), queryFn: () => coaApi.get(id), enabled: !!id });
}

export function useCreateChartOfAccount(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<ChartOfAccount>) => coaApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: coaKeys.all(orgId) }) });
}

export function useUpdateChartOfAccount(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<ChartOfAccount> }) => coaApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: coaKeys.all(orgId) }); qc.invalidateQueries({ queryKey: coaKeys.detail(id) }); } });
}

export function useDeleteChartOfAccount(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => coaApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: coaKeys.all(orgId) }) });
}
