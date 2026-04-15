import type { Comment } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const commentKeys = {
  forEntity: (entity: string, id: string) => ['comments', entity, id] as const,
};

type Entity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'vendor' | 'document' | 'asset' | 'booking' | 'request' | 'meeting' | 'transaction' | 'financial-year';

const commentApi = {
  getForEntity: (entity: Entity, id: string) => api.get<Comment[]>(`/api/comment/${entity}/${id}`),
  create: (orgId: string, data: Partial<Comment>) => api.post<Comment>(`/api/comment/${orgId}`, data),
  createUserComment: (orgId: string, data: Partial<Comment>) => api.post<Comment>(`/api/comment/user/${orgId}`, data),
  createWallComment: (orgId: string, data: Partial<Comment>) => api.post<Comment>(`/api/comment/wall/${orgId}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/comment/${id}`),
};

export function useComments(entity: Entity, id: string) {
  return useQuery({ queryKey: commentKeys.forEntity(entity, id), queryFn: () => commentApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateComment(orgId: string, entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Comment>) => commentApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: commentKeys.forEntity(entity, entityId) }) });
}

export function useDeleteComment(entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => commentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: commentKeys.forEntity(entity, entityId) }) });
}
