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
  getAll: (orgId: string) => api.get<Quote[]>(`/api/quote/org/${orgId}`),
  get: (id: string) => api.get<Quote>(`/api/quote/${id}`),
  create: (orgId: string, data: Partial<Quote>) => api.post<Quote>(`/api/quote/${orgId}`, data),
  update: (id: string, data: Partial<Quote>) => api.put<Quote>(`/api/quote/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/quote/${id}`),
  getAllArchived: (orgId: string) => api.get<Quote[]>(`/api/quote/org/archived/${orgId}`),
  archive: (id: string) => api.patch<Quote>(`/api/quote/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Quote>(`/api/quote/unarchive/${id}`, {}),
  flag: (id: string, data: { reason: string }) => api.patch<Quote>(`/api/quote/flag/${id}`, data),
  unflag: (id: string) => api.patch<Quote>(`/api/quote/unflag/${id}`, {}),
  updateStatus: (id: string, data: { status: string }) => api.patch<Quote>(`/api/quote/status/${id}`, data),
  getAllForWorkflow: (wId: string) => api.get<Quote[]>(`/api/quote/workflow/${wId}`),
  getAllForVendor: (vId: string) => api.get<Quote[]>(`/api/quote/vendor/${vId}`),
  extend: (id: string) => api.patch<Quote>(`/api/quote/extend/${id}`, {}),
  remind: (id: string) => api.patch<Quote>(`/api/quote/remind/${id}`, {}),
  submit: (id: string) => api.patch<Quote>(`/api/quote/submit/${id}`, {}),
};

export function useQuotes(orgId: string) {
  return useQuery({ queryKey: quoteKeys.all(orgId), queryFn: () => quoteApi.getAll(orgId), enabled: !!orgId });
}

export function useQuote(id: string) {
  return useQuery({ queryKey: quoteKeys.detail(id), queryFn: () => quoteApi.get(id), enabled: !!id });
}

export function useArchivedQuotes(orgId: string) {
  return useQuery({ queryKey: quoteKeys.archived(orgId), queryFn: () => quoteApi.getAllArchived(orgId), enabled: !!orgId });
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

export function useFlagQuote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, reason }: { id: string; reason: string }) => quoteApi.flag(id, { reason }), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: quoteKeys.all(orgId) }); qc.invalidateQueries({ queryKey: quoteKeys.detail(id) }); } });
}

export function useUnflagQuote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => quoteApi.unflag(id), onSuccess: (_, id) => { qc.invalidateQueries({ queryKey: quoteKeys.all(orgId) }); qc.invalidateQueries({ queryKey: quoteKeys.detail(id) }); } });
}