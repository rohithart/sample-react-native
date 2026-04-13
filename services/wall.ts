import type { WallPost } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const wallKeys = {
  all: (orgId: string) => ['wall', orgId] as const,
};

const wallApi = {
  getAll: (orgId: string) => api.get<WallPost[]>(`/wall/org/${orgId}`),
  getAllForUser: (orgId: string, userId: string) => api.get<WallPost[]>(`/wall/org/${orgId}/user/${userId}`),
  create: (orgId: string, data: Partial<WallPost>) => api.post<WallPost>(`/wall/${orgId}`, data),
  delete: (id: string) => api.delete<boolean>(`/wall/${id}`),
  like: (orgId: string, id: string) => api.patch<WallPost>(`/wall/like/${orgId}/${id}`, {}),
  unlike: (orgId: string, id: string) => api.patch<WallPost>(`/wall/unlike/${orgId}/${id}`, {}),
};

export function useWallPosts(orgId: string) {
  return useQuery({ queryKey: wallKeys.all(orgId), queryFn: () => wallApi.getAll(orgId), enabled: !!orgId });
}

export function useCreateWallPost(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<WallPost>) => wallApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: wallKeys.all(orgId) }) });
}

export function useDeleteWallPost(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => wallApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: wallKeys.all(orgId) }) });
}

export function useLikeWallPost(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => wallApi.like(orgId, id), onSuccess: () => qc.invalidateQueries({ queryKey: wallKeys.all(orgId) }) });
}
