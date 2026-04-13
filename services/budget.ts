import type { Budget } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const budgetKeys = {
  forFY: (fyId: string) => ['budgets', 'fy', fyId] as const,
  detail: (id: string) => ['budgets', 'detail', id] as const,
};

const budgetApi = {
  getByFinancialYear: (fyId: string) => api.get<Budget[]>(`/budget/financial-year/${fyId}`),
  getOther: (id: string) => api.get<Budget[]>(`/budget/other/${id}`),
  get: (id: string) => api.get<Budget>(`/budget/${id}`),
  create: (orgId: string, data: Partial<Budget>) => api.post<Budget>(`/budget/${orgId}`, data),
  approve: (id: string, data: any) => api.put<Budget>(`/budget/approve/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/budget/${id}`),
};

export function useBudgets(fyId: string) {
  return useQuery({ queryKey: budgetKeys.forFY(fyId), queryFn: () => budgetApi.getByFinancialYear(fyId), enabled: !!fyId });
}

export function useBudget(id: string) {
  return useQuery({ queryKey: budgetKeys.detail(id), queryFn: () => budgetApi.get(id), enabled: !!id });
}

export function useCreateBudget(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Budget>) => budgetApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['budgets'] }) });
}

export function useDeleteBudget() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => budgetApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['budgets'] }) });
}
