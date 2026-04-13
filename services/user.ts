import type { User } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const userKeys = {
  all: (orgId: string) => ['users', orgId] as const,
  admins: (orgId: string) => ['users', orgId, 'admins'] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
  current: ['users', 'current'] as const,
  assignable: (orgId: string) => ['users', orgId, 'assignable'] as const,
};

const userApi = {
  getAll: (orgId: string) => api.get<User[]>(`/user/org/${orgId}`),
  getAllAdmins: (orgId: string) => api.get<User[]>(`/user/admins/${orgId}`),
  get: (id: string) => api.get<User>(`/user/${id}`),
  getCurrentUser: () => api.get<User>('/user/user/current'),
  getUserRole: (orgId: string) => api.get<{ role: string }>(`/user/role/${orgId}`),
  getAllAssignable: (orgId: string) => api.get<User[]>(`/user/assign/${orgId}`),
  create: (orgId: string, data: Partial<User>) => api.post<User>(`/user/${orgId}`, data),
  onboard: (orgCode: string, data: Partial<User>) => api.post<User>(`/user/onboard/${orgCode}`, data),
  delete: (id: string) => api.delete<boolean>(`/user/${id}`),
  archive: (id: string) => api.patch<User>(`/user/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<User>(`/user/unarchive/${id}`, {}),
  updateStatus: (id: string, data: { status: string }) => api.patch<User>(`/user/status/${id}`, data),
  updateProfile: (id: string, data: Partial<User>) => api.patch<User>(`/user/profile/${id}`, data),
  updateRoleProfile: (id: string, data: any) => api.patch<User>(`/user/role-profile/${id}`, data),
};

export function useUsers(orgId: string) {
  return useQuery({ queryKey: userKeys.all(orgId), queryFn: () => userApi.getAll(orgId), enabled: !!orgId });
}

export function useUser(id: string) {
  return useQuery({ queryKey: userKeys.detail(id), queryFn: () => userApi.get(id), enabled: !!id });
}

export function useCurrentUser() {
  return useQuery({ queryKey: userKeys.current, queryFn: () => userApi.getCurrentUser() });
}

export function useCreateUser(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<User>) => userApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all(orgId) }) });
}

export function useDeleteUser(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => userApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all(orgId) }) });
}

export function useUpdateUserProfile(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => userApi.updateProfile(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: userKeys.all(orgId) }); qc.invalidateQueries({ queryKey: userKeys.detail(id) }); } });
}
