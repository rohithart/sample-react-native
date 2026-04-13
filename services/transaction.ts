import type { Transaction } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const transactionKeys = {
  forFY: (fyId: string) => ['transactions', 'fy', fyId] as const,
  archivedForFY: (fyId: string) => ['transactions', 'fy', fyId, 'archived'] as const,
  detail: (id: string) => ['transactions', 'detail', id] as const,
};

const transactionApi = {
  getByFinancialYear: (fyId: string) => api.get<Transaction[]>(`/transaction/financial-year/${fyId}`),
  getByFinancialYearArchived: (fyId: string) => api.get<Transaction[]>(`/transaction/financial-year/archived/${fyId}`),
  getForRange: (orgId: string, data: any) => api.patch<Transaction[]>(`/transaction/range/${orgId}`, data),
  getForRangeArchived: (orgId: string, data: any) => api.patch<Transaction[]>(`/transaction/range/archived/${orgId}`, data),
  get: (id: string) => api.get<Transaction>(`/transaction/${id}`),
  create: (orgId: string, data: Partial<Transaction>) => api.post<Transaction>(`/transaction/${orgId}`, data),
  update: (id: string, data: Partial<Transaction>) => api.put<Transaction>(`/transaction/${id}`, data),
  archive: (id: string) => api.patch<Transaction>(`/transaction/archive/${id}`, {}),
  delete: (id: string) => api.delete<boolean>(`/transaction/${id}`),
};

export function useTransactions(fyId: string) {
  return useQuery({ queryKey: transactionKeys.forFY(fyId), queryFn: () => transactionApi.getByFinancialYear(fyId), enabled: !!fyId });
}

export function useTransaction(id: string) {
  return useQuery({ queryKey: transactionKeys.detail(id), queryFn: () => transactionApi.get(id), enabled: !!id });
}

export function useCreateTransaction(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Transaction>) => transactionApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['transactions'] }) });
}

export function useUpdateTransaction() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Transaction> }) => transactionApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: ['transactions'] }); qc.invalidateQueries({ queryKey: transactionKeys.detail(id) }); } });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => transactionApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['transactions'] }) });
}
