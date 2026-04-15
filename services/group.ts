import type { Group } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const groupKeys = {
  all: (orgId: string) => ['groups', orgId] as const,
  detail: (id: string) => ['groups', 'detail', id] as const,
  users: (orgId: string) => ['groups', orgId, 'users'] as const,
  userGroups: (id: string) => ['groups', 'user-groups', id] as const,
};

const groupApi = {
  getAll: (orgId: string) => api.get<Group[]>(`/api/group/org/${orgId}`),
  getAllUsers: (orgId: string) => api.get<any[]>(`/api/group/users/${orgId}`),
  getAllUserGroup: (id: string) => api.get<Group[]>(`/api/group/user-groups/${id}`),
  getCurrentUserGroup: (id: string) => api.get<Group>(`/api/group/current-user/${id}`),
  getAllUnAssignedUsers: (orgId: string) => api.get<any[]>(`/api/group/unassigned-users/${orgId}`),
  get: (id: string) => api.get<Group>(`/api/group/${id}`),
  create: (orgId: string, data: Partial<Group>) => api.post<Group>(`/api/group/${orgId}`, data),
  addUsers: (orgId: string, data: any) => api.put<Group>(`/api/group/add/${orgId}`, data),
  removeUsers: (orgId: string, data: any) => api.put<Group>(`/api/group/remove/${orgId}`, data),
  archive: (id: string) => api.patch<Group>(`/api/group/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Group>(`/api/group/unarchive/${id}`, {}),
  delete: (id: string) => api.delete<boolean>(`/api/group/${id}`),
};

export function useGroups(orgId: string) {
  return useQuery({ queryKey: groupKeys.all(orgId), queryFn: () => groupApi.getAll(orgId), enabled: !!orgId });
}

export function useGroup(id: string) {
  return useQuery({ queryKey: groupKeys.detail(id), queryFn: () => groupApi.get(id), enabled: !!id });
}

export function useCreateGroup(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Group>) => groupApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: groupKeys.all(orgId) }) });
}

export function useDeleteGroup(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => groupApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: groupKeys.all(orgId) }) });
}
