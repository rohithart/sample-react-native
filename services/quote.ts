import type { Quote } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const quoteKeys = {
  all: (orgId: string) => ['quote', orgId] as const,
  detail: (id: string) => ['quote', 'detail', id] as const,
  archived: (orgId: string) => ['quote', orgId, 'archived'] as const,
  forWorkflow: (wId: string) => ['quote', 'workflow', wId] as const,
  forVendor: (vId: string) => ['quote', 'vendor', vId] as const,
};

const quoteApi = {
  getAll: (orgId: string) => api.get<Quote[]>(`/quote/org/${orgId}`),
  get: (id: string) => api.get<Quote>(`/quote/${id}`),
  create: (orgId: string, data: Partial<Quote>) => api.post<Quote>(`/quote/${orgId}`, data),
  update: (id: string, data: Partial<Quote>) => api.put<Quote>(`/quote/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/quote/${id}`),
  getAllArchived: (orgId: string) => api.get<Quote[]>(`/quote/org/archived/${orgId}`),
  archive: (id: string) => api.patch<Quote>(`/quote/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Quote>(`/quote/unarchive/${id}`, {}),
  flag: (id: string, data: { reason: string }) => api.patch<Quote>(`/quote/flag/${id}`, data),
  unflag: (id: string) => api.patch<Quote>(`/quote/unflag/${id}`, {}),
  updateStatus: (id: string, data: { status: string }) => api.patch<Quote>(`/quote/status/${id}`, data),
  getAllForWorkflow: (wId: string) => api.get<Quote[]>(`/quote/workflow/${wId}`),
  getAllForVendor: (vId: string) => api.get<Quote[]>(`/quote/vendor/${vId}`),
  extend: (id: string) => api.patch<Quote>(`/quote/extend/${id}`, {}),
  remind: (id: string) => api.patch<Quote>(`/quote/remind/${id}`, {}),
  submit: (id: string) => api.patch<Quote>(`/quote/submit/${id}`, {}),
};

export function useQuotes(orgId: string) {
  return useQuery({ queryKey: quoteKeys.all(orgId), queryFn: () => quoteApi.getAll(orgId), enabled: !!orgId });
}

export function useQuote(id: string) {
  return useQuery({ queryKey: quoteKeys.detail(id), queryFn: () => quoteApi.get(id), enabled: !!id });
}

export function useCreateQuote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Quote>) => quoteApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: quoteKeys.all(orgId) }) });
}

export function useUpdateQuote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Quote> }) => quoteApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: quoteKeys.all(orgId) }); qc.invalidateQueries({ queryKey: quoteKeys.detail(id) }); } });
}

export function useDeleteQuote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => quoteApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: quoteKeys.all(orgId) }) });
}
export function useArchiveQuote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => quoteApi.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: quoteKeys.all(orgId) }); } });
}

export function useUnarchiveQuote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => quoteApi.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: quoteKeys.all(orgId) }); } });
}

export function useUpdateQuoteStatus(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, status }: { id: string; status: string }) => quoteApi.updateStatus(id, { status }), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: quoteKeys.all(orgId) }); qc.invalidateQueries({ queryKey: quoteKeys.detail(id) }); } });
}
