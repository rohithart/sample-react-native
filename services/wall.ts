import type { Wall } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const wallKeys = {
  all: (orgId: string) => ['wall', orgId] as const,
};

const wallApi = {
  getAll: (orgId: string) => api.get<Wall[]>(`/api/wall/org/${orgId}`),
  getAllForUser: (orgId: string, userId: string) => api.get<Wall[]>(`/api/wall/org/${orgId}/user/${userId}`),
  create: (orgId: string, data: Partial<Wall>) => api.post<Wall>(`/api/wall/${orgId}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/wall/${id}`),
  like: (orgId: string, id: string) => api.patch<Wall>(`/api/wall/like/${orgId}/${id}`, {}),
  unlike: (orgId: string, id: string) => api.patch<Wall>(`/api/wall/unlike/${orgId}/${id}`, {}),
};

export function useWalls(orgId: string) {
  return useQuery({ queryKey: wallKeys.all(orgId), queryFn: () => wallApi.getAll(orgId), enabled: !!orgId });
}

export function useCreateWall(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Wall>) => wallApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: wallKeys.all(orgId) }) });
}

export function useDeleteWall(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => wallApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: wallKeys.all(orgId) }) });
}

export function useLikeWall(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => wallApi.like(orgId, id), onSuccess: () => qc.invalidateQueries({ queryKey: wallKeys.all(orgId) }) });
}
