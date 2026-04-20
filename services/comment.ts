import type { Comment } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';
import { EntityType } from '@/enums';
import { resolveEntityType } from '@/utils/entity';

export const commentKeys = {
  forEntity: (entity: string, id: string) => ['comments', entity, id] as const,
};

const commentApi = {
  getForEntity: (entity: EntityType, id: string) => api.get<Comment[]>(`/api/comment/${resolveEntityType(entity)}/${id}`),
  create: (orgId: string, data: Partial<Comment>) => api.post<Comment>(`/api/comment/${orgId}`, data),
  createUserComment: (orgId: string, data: Partial<Comment>) => api.post<Comment>(`/api/comment/user/${orgId}`, data),
  createWallComment: (orgId: string, data: Partial<Comment>) => api.post<Comment>(`/api/comment/wall/${orgId}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/comment/${id}`),
};

export function useComments(entity: EntityType, id: string) {
  return useQuery({ queryKey: commentKeys.forEntity(entity, id), queryFn: () => commentApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateComment(orgId: string, entity: EntityType, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Comment>) => commentApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: commentKeys.forEntity(entity, entityId) }) });
}

export function useDeleteComment(entity: EntityType, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => commentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: commentKeys.forEntity(entity, entityId) }) });
}
