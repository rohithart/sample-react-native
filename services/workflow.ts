import type { Workflow } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const workflowKeys = {
  all: (orgId: string) => ['workflows', orgId] as const,
  forUser: (orgId: string, userId: string) => ['workflows', orgId, 'user', userId] as const,
  forGroup: (orgId: string, groupId: string) => ['workflows', orgId, 'group', groupId] as const,
  archived: (orgId: string) => ['workflows', orgId, 'archived'] as const,
  active: (orgId: string) => ['workflows', orgId, 'active'] as const,
  forCategory: (categoryId: string) => ['workflows', 'category', categoryId] as const,
  detail: (id: string) => ['workflows', 'detail', id] as const,
  subWorkflows: (id: string) => ['workflows', 'sub', id] as const,
};

const workflowApi = {
  getAll: (orgId: string) => api.get<Workflow[]>(`/workflow/org/${orgId}`),
  getAllForUser: (orgId: string, userId: string) => api.get<Workflow[]>(`/workflow/org/${orgId}/user/${userId}`),
  getAllForGroup: (orgId: string, groupId: string) => api.get<Workflow[]>(`/workflow/org/${orgId}/group/${groupId}`),
  getAllArchived: (orgId: string) => api.get<Workflow[]>(`/workflow/org/archived/${orgId}`),
  getAllActive: (orgId: string) => api.get<Workflow[]>(`/workflow/org/active/${orgId}`),
  getAllForCategory: (categoryId: string) => api.get<Workflow[]>(`/workflow/category/${categoryId}`),
  get: (id: string) => api.get<Workflow>(`/workflow/${id}`),
  getAllForWorkflow: (id: string) => api.get<Workflow[]>(`/workflow/all/${id}`),
  create: (orgId: string, data: Partial<Workflow>) => api.post<Workflow>(`/workflow/${orgId}`, data),
  update: (id: string, data: Partial<Workflow>) => api.put<Workflow>(`/workflow/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/workflow/${id}`),
  updateStatus: (id: string, data: { status: string }) => api.patch<Workflow>(`/workflow/status/${id}`, data),
  updateUser: (id: string, data: { userId: string }) => api.patch<Workflow>(`/workflow/user/${id}`, data),
  updateGroup: (id: string, data: { groupId: string }) => api.patch<Workflow>(`/workflow/group/${id}`, data),
  updatePriority: (id: string, data: { priority: string }) => api.patch<Workflow>(`/workflow/priority/${id}`, data),
  archive: (id: string) => api.patch<Workflow>(`/workflow/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Workflow>(`/workflow/unarchive/${id}`, {}),
  flag: (id: string, data: { reason: string }) => api.patch<Workflow>(`/workflow/flag/${id}`, data),
  unflag: (id: string) => api.patch<Workflow>(`/workflow/unflag/${id}`, {}),
};

export function useWorkflows(orgId: string) {
  return useQuery({ queryKey: workflowKeys.all(orgId), queryFn: () => workflowApi.getAll(orgId), enabled: !!orgId });
}

export function useWorkflowsForUser(orgId: string, userId: string) {
  return useQuery({ queryKey: workflowKeys.forUser(orgId, userId), queryFn: () => workflowApi.getAllForUser(orgId, userId), enabled: !!orgId && !!userId });
}

export function useArchivedWorkflows(orgId: string) {
  return useQuery({ queryKey: workflowKeys.archived(orgId), queryFn: () => workflowApi.getAllArchived(orgId), enabled: !!orgId });
}

export function useWorkflow(id: string) {
  return useQuery({ queryKey: workflowKeys.detail(id), queryFn: () => workflowApi.get(id), enabled: !!id });
}

export function useCreateWorkflow(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Workflow>) => workflowApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }) });
}

export function useUpdateWorkflow(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Workflow> }) => workflowApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workflowKeys.detail(id) }); } });
}

export function useDeleteWorkflow(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => workflowApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }) });
}

export function useArchiveWorkflow(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => workflowApi.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workflowKeys.archived(orgId) }); } });
}

export function useUnarchiveWorkflow(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => workflowApi.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workflowKeys.archived(orgId) }); } });
}

export function useUpdateWorkflowUser(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, userId }: { id: string; userId: string }) => workflowApi.updateUser(id, { userId }), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workflowKeys.detail(id) }); } });
}

export function useUpdateWorkflowGroup(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, groupId }: { id: string; groupId: string }) => workflowApi.updateGroup(id, { groupId }), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workflowKeys.detail(id) }); } });
}

export function useUpdateWorkflowStatus(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, status }: { id: string; status: string }) => workflowApi.updateStatus(id, { status }), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workflowKeys.detail(id) }); } });
}
