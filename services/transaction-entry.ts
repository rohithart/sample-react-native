import type { TransactionEntry } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const txEntryKeys = {
  forFY: (fyId: string) => ['txEntries', 'fy', fyId] as const,
  detail: (id: string) => ['txEntries', 'detail', id] as const,
};

const txEntryApi = {
  getByFinancialYear: (fyId: string) => api.get<TransactionEntry[]>(`/api/transaction-entry/financial-year/${fyId}`),
  get: (id: string) => api.get<TransactionEntry>(`/api/transaction-entry/${id}`),
  getRange: (orgId: string, data: any) => api.patch<TransactionEntry[]>(`/api/transaction-entry/range/${orgId}`, data),
  create: (transactionId: string, data: Partial<TransactionEntry>) => api.post<TransactionEntry>(`/api/transaction-entry/${transactionId}`, data),
};

export function useTransactionEntries(fyId: string) {
  return useQuery({ queryKey: txEntryKeys.forFY(fyId), queryFn: () => txEntryApi.getByFinancialYear(fyId), enabled: !!fyId });
}

export function useTransactionEntry(id: string) {
  return useQuery({ queryKey: txEntryKeys.detail(id), queryFn: () => txEntryApi.get(id), enabled: !!id });
}

export function useCreateTransactionEntry() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ transactionId, data }: { transactionId: string; data: Partial<TransactionEntry> }) => txEntryApi.create(transactionId, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['txEntries'] }) });
}
