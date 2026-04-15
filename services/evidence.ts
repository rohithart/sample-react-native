import type { Evidence } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const evidenceKeys = {
  all: (orgId: string) => ['evidence', orgId] as const,
  detail: (id: string) => ['evidence', 'detail', id] as const,
  archived: (orgId: string) => ['evidence', orgId, 'archived'] as const,
  forWorkflow: (wId: string) => ['evidence', 'workflow', wId] as const,
  forVendor: (vId: string) => ['evidence', 'vendor', vId] as const,
};

const evidenceApi = {
  getAll: (orgId: string) => api.get<Evidence[]>(`/api/evidence/org/${orgId}`),
  get: (id: string) => api.get<Evidence>(`/api/evidence/${id}`),
  create: (orgId: string, data: Partial<Evidence>) => api.post<Evidence>(`/api/evidence/${orgId}`, data),
  update: (id: string, data: Partial<Evidence>) => api.put<Evidence>(`/api/evidence/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/evidence/${id}`),
  getAllArchived: (orgId: string) => api.get<Evidence[]>(`/api/evidence/org/archived/${orgId}`),
  archive: (id: string) => api.patch<Evidence>(`/api/evidence/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Evidence>(`/api/evidence/unarchive/${id}`, {}),
  flag: (id: string, data: { reason: string }) => api.patch<Evidence>(`/api/evidence/flag/${id}`, data),
  unflag: (id: string) => api.patch<Evidence>(`/api/evidence/unflag/${id}`, {}),
  updateStatus: (id: string, data: { status: string }) => api.patch<Evidence>(`/api/evidence/status/${id}`, data),
  getAllForWorkflow: (wId: string) => api.get<Evidence[]>(`/api/evidence/workflow/${wId}`),
  getAllForVendor: (vId: string) => api.get<Evidence[]>(`/api/evidence/vendor/${vId}`),
  requestFromVendor: (id: string) => api.patch<Evidence>(`/api/evidence/request/${id}`, {}),
  createForQuote: (qId: string, data: Partial<Evidence>) => api.post<Evidence>(`/api/evidence/quote/${qId}`, data),
  createForWorkorder: (woId: string, data: Partial<Evidence>) => api.post<Evidence>(`/api/evidence/workorder/${woId}`, data),
  submit: (id: string) => api.patch<Evidence>(`/api/evidence/submit/${id}`, {}),
};

export function useEvidences(orgId: string) {
  return useQuery({ queryKey: evidenceKeys.all(orgId), queryFn: () => evidenceApi.getAll(orgId), enabled: !!orgId });
}

export function useEvidence(id: string) {
  return useQuery({ queryKey: evidenceKeys.detail(id), queryFn: () => evidenceApi.get(id), enabled: !!id });
}

export function useCreateEvidence(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Evidence>) => evidenceApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: evidenceKeys.all(orgId) }) });
}

export function useUpdateEvidence(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Evidence> }) => evidenceApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: evidenceKeys.all(orgId) }); qc.invalidateQueries({ queryKey: evidenceKeys.detail(id) }); } });
}

export function useDeleteEvidence(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => evidenceApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: evidenceKeys.all(orgId) }) });
}
export function useArchiveEvidence(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => evidenceApi.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: evidenceKeys.all(orgId) }); } });
}

export function useUnarchiveEvidence(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => evidenceApi.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: evidenceKeys.all(orgId) }); } });
}

export function useUpdateEvidenceStatus(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, status }: { id: string; status: string }) => evidenceApi.updateStatus(id, { status }), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: evidenceKeys.all(orgId) }); qc.invalidateQueries({ queryKey: evidenceKeys.detail(id) }); } });
}
