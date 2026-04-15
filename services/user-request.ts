import type { UserRequest } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const userRequestKeys = {
  all: (orgId: string) => ['userRequests', orgId] as const,
  forUser: (orgId: string) => ['userRequests', orgId, 'user'] as const,
  detail: (id: string) => ['userRequests', 'detail', id] as const,
};

const userRequestApi = {
  getAll: (orgId: string) => api.get<UserRequest[]>(`/api/user-request/org/${orgId}`),
  getAllForUser: (orgId: string) => api.get<UserRequest[]>(`/api/user-request/user/${orgId}`),
  getForUser: (id: string) => api.get<UserRequest>(`/api/user-request/view/${id}`),
  get: (id: string) => api.get<UserRequest>(`/api/user-request/${id}`),
  create: (orgId: string, data: Partial<UserRequest>) => api.post<UserRequest>(`/api/user-request/${orgId}`, data),
  update: (id: string, data: Partial<UserRequest>) => api.put<UserRequest>(`/api/user-request/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/user-request/${id}`),
  approve: (id: string) => api.patch<UserRequest>(`/api/user-request/approve/${id}`, {}),
  reject: (id: string) => api.patch<UserRequest>(`/api/user-request/reject/${id}`, {}),
};

export function useUserRequests(orgId: string) {
  return useQuery({ queryKey: userRequestKeys.all(orgId), queryFn: () => userRequestApi.getAll(orgId), enabled: !!orgId });
}

export function useUserRequest(id: string) {
  return useQuery({ queryKey: userRequestKeys.detail(id), queryFn: () => userRequestApi.get(id), enabled: !!id });
}

export function useCreateUserRequest(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<UserRequest>) => userRequestApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: userRequestKeys.all(orgId) }) });
}

export function useUpdateUserRequest(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<UserRequest> }) => userRequestApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: userRequestKeys.all(orgId) }); qc.invalidateQueries({ queryKey: userRequestKeys.detail(id) }); } });
}

export function useDeleteUserRequest(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => userRequestApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: userRequestKeys.all(orgId) }) });
}

export function useApproveUserRequest(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => userRequestApi.approve(id), onSuccess: () => qc.invalidateQueries({ queryKey: userRequestKeys.all(orgId) }) });
}

export function useRejectUserRequest(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => userRequestApi.reject(id), onSuccess: () => qc.invalidateQueries({ queryKey: userRequestKeys.all(orgId) }) });
}
