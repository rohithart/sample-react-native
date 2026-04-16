import type { Workorder } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const workorderKeys = {
  all: (orgId: string) => ['workorder', orgId] as const,
  detail: (id: string) => ['workorder', 'detail', id] as const,
  archived: (orgId: string) => ['workorder', orgId, 'archived'] as const,
  forWorkflow: (wId: string) => ['workorder', 'workflow', wId] as const,
  forVendor: (vId: string) => ['workorder', 'vendor', vId] as const,
  forQuote: (qId: string) => ['workorder', 'quote', qId] as const,
};

const workorderApi = {
  getAll: (orgId: string) => api.get<Workorder[]>(`/api/workorder/org/${orgId}`),
  get: (id: string) => api.get<Workorder>(`/api/workorder/${id}`),
  create: (orgId: string, data: Partial<Workorder>) => api.post<Workorder>(`/api/workorder/${orgId}`, data),
  update: (id: string, data: Partial<Workorder>) => api.put<Workorder>(`/api/workorder/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/workorder/${id}`),
  getAllArchived: (orgId: string) => api.get<Workorder[]>(`/api/workorder/org/archived/${orgId}`),
  archive: (id: string) => api.patch<Workorder>(`/api/workorder/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Workorder>(`/api/workorder/unarchive/${id}`, {}),
  flag: (id: string, data: { reason: string }) => api.patch<Workorder>(`/api/workorder/flag/${id}`, data),
  unflag: (id: string) => api.patch<Workorder>(`/api/workorder/unflag/${id}`, {}),
  updateStatus: (id: string, data: { status: string }) => api.patch<Workorder>(`/api/workorder/status/${id}`, data),
  getAllForWorkflow: (wId: string) => api.get<Workorder[]>(`/api/workorder/workflow/${wId}`),
  getAllForVendor: (vId: string) => api.get<Workorder[]>(`/api/workorder/vendor/${vId}`),
  getAllForQuote: (qId: string) => api.get<Workorder[]>(`/api/workorder/quote/${qId}`),
  createForQuote: (qId: string, data: Partial<Workorder>) => api.post<Workorder>(`/api/workorder/quote/${qId}`, data),
  submit: (id: string) => api.patch<Workorder>(`/api/workorder/submit/${id}`, {}),
  remind: (id: string) => api.patch<Workorder>(`/api/workorder/remind/${id}`, {}),
};

export function useWorkorders(orgId: string) {
  return useQuery({ queryKey: workorderKeys.all(orgId), queryFn: () => workorderApi.getAll(orgId), enabled: !!orgId });
}

export function useWorkorder(id: string) {
  return useQuery({ queryKey: workorderKeys.detail(id), queryFn: () => workorderApi.get(id), enabled: !!id });
}

export function useArchivedWorkorders(orgId: string) {
  return useQuery({ queryKey: workorderKeys.archived(orgId), queryFn: () => workorderApi.getAllArchived(orgId), enabled: !!orgId });
}

export function useCreateWorkorder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Workorder>) => workorderApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: workorderKeys.all(orgId) }) });
}

export function useUpdateWorkorder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Workorder> }) => workorderApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: workorderKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workorderKeys.detail(id) }); } });
}

export function useDeleteWorkorder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => workorderApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: workorderKeys.all(orgId) }) });
}
export function useArchiveWorkorder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => workorderApi.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: workorderKeys.all(orgId) }); } });
}

export function useUnarchiveWorkorder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => workorderApi.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: workorderKeys.all(orgId) }); } });
}

export function useUpdateWorkorderStatus(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, status }: { id: string; status: string }) => workorderApi.updateStatus(id, { status }), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: workorderKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workorderKeys.detail(id) }); } });
}
