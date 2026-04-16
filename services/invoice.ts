import type { Invoice } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const invoiceKeys = {
  all: (orgId: string) => ['invoice', orgId] as const,
  detail: (id: string) => ['invoice', 'detail', id] as const,
  archived: (orgId: string) => ['invoice', orgId, 'archived'] as const,
  forWorkflow: (wId: string) => ['invoice', 'workflow', wId] as const,
  forVendor: (vId: string) => ['invoice', 'vendor', vId] as const,
  forQuote: (qId: string) => ['invoice', 'quote', qId] as const,
  forWorkorder: (woId: string) => ['invoice', 'workorder', woId] as const,
};

const invoiceApi = {
  getAll: (orgId: string) => api.get<Invoice[]>(`/api/invoice/org/${orgId}`),
  get: (id: string) => api.get<Invoice>(`/api/invoice/${id}`),
  create: (orgId: string, data: Partial<Invoice>) => api.post<Invoice>(`/api/invoice/${orgId}`, data),
  update: (id: string, data: Partial<Invoice>) => api.put<Invoice>(`/api/invoice/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/invoice/${id}`),
  getAllArchived: (orgId: string) => api.get<Invoice[]>(`/api/invoice/org/archived/${orgId}`),
  archive: (id: string) => api.patch<Invoice>(`/api/invoice/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Invoice>(`/api/invoice/unarchive/${id}`, {}),
  flag: (id: string, data: { reason: string }) => api.patch<Invoice>(`/api/invoice/flag/${id}`, data),
  unflag: (id: string) => api.patch<Invoice>(`/api/invoice/unflag/${id}`, {}),
  updateStatus: (id: string, data: { status: string }) => api.patch<Invoice>(`/api/invoice/status/${id}`, data),
  getAllForWorkflow: (wId: string) => api.get<Invoice[]>(`/api/invoice/workflow/${wId}`),
  getAllForVendor: (vId: string) => api.get<Invoice[]>(`/api/invoice/vendor/${vId}`),
  getAllForQuote: (qId: string) => api.get<Invoice[]>(`/api/invoice/quote/${qId}`),
  getAllForWorkorder: (woId: string) => api.get<Invoice[]>(`/api/invoice/workorder/${woId}`),
  createForQuote: (qId: string, data: Partial<Invoice>) => api.post<Invoice>(`/api/invoice/quote/${qId}`, data),
  createForWorkorder: (woId: string, data: Partial<Invoice>) => api.post<Invoice>(`/api/invoice/workorder/${woId}`, data),
  submit: (id: string) => api.patch<Invoice>(`/api/invoice/submit/${id}`, {}),
  remind: (id: string) => api.patch<Invoice>(`/api/invoice/remind/${id}`, {}),
};

export function useInvoices(orgId: string) {
  return useQuery({ queryKey: invoiceKeys.all(orgId), queryFn: () => invoiceApi.getAll(orgId), enabled: !!orgId });
}

export function useInvoice(id: string) {
  return useQuery({ queryKey: invoiceKeys.detail(id), queryFn: () => invoiceApi.get(id), enabled: !!id });
}

export function useArchivedInvoices(orgId: string) {
  return useQuery({ queryKey: invoiceKeys.archived(orgId), queryFn: () => invoiceApi.getAllArchived(orgId), enabled: !!orgId });
}

export function useCreateInvoice(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Invoice>) => invoiceApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: invoiceKeys.all(orgId) }) });
}

export function useUpdateInvoice(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Invoice> }) => invoiceApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: invoiceKeys.all(orgId) }); qc.invalidateQueries({ queryKey: invoiceKeys.detail(id) }); } });
}

export function useDeleteInvoice(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => invoiceApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: invoiceKeys.all(orgId) }) });
}
export function useArchiveInvoice(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => invoiceApi.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all(orgId) }); } });
}

export function useUnarchiveInvoice(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => invoiceApi.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all(orgId) }); } });
}

export function useUpdateInvoiceStatus(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, status }: { id: string; status: string }) => invoiceApi.updateStatus(id, { status }), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: invoiceKeys.all(orgId) }); qc.invalidateQueries({ queryKey: invoiceKeys.detail(id) }); } });
}
