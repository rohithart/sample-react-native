import type { User, UserRole } from '@/types';
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
  getAll: (orgId: string) => api.get<UserRole[]>(`/api/user/org/${orgId}`),
  getAllAdmins: (orgId: string) => api.get<UserRole[]>(`/api/user/admins/${orgId}`),
  get: (id: string) => api.get<UserRole>(`/api/user/${id}`),
  getCurrentUser: () => api.get<User>('/api/user/user/current'),
  getUserRole: (orgId: string) => api.get<UserRole>(`/api/user/role/${orgId}`),
  getAllAssignable: (orgId: string) => api.get<UserRole[]>(`/api/user/assign/${orgId}`),
  create: (orgId: string, data: Partial<User>) => api.post<User>(`/api/user/${orgId}`, data),
  onboard: (orgCode: string, data: Partial<User>) => api.post<User>(`/api/user/onboard/${orgCode}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/user/${id}`),
  archive: (id: string) => api.patch<UserRole>(`/api/user/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<UserRole>(`/api/user/unarchive/${id}`, {}),
  updateStatus: (id: string, data: { status: string }) => api.patch<UserRole>(`/api/user/status/${id}`, data),
  updateProfile: (id: string, data: Partial<User>) => api.patch<UserRole>(`/api/user/profile/${id}`, data),
  updateRoleProfile: (id: string, data: any) => api.patch<UserRole>(`/api/user/role-profile/${id}`, data),
};

export function useUsers(orgId: string) {
  return useQuery({ queryKey: userKeys.all(orgId), queryFn: () => userApi.getAll(orgId), enabled: !!orgId });
}

export function useAssignableUsers(orgId: string) {
  return useQuery({ queryKey: userKeys.assignable(orgId), queryFn: () => userApi.getAllAssignable(orgId), enabled: !!orgId });
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

export function useGetAllAdmins(orgId: string) {
  return useQuery({ queryKey: userKeys.admins(orgId), queryFn: () => userApi.getAllAdmins(orgId), enabled: !!orgId });
}
