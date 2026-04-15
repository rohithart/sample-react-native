import type { AppImage } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const imageKeys = {
  forEntity: (entity: string, id: string) => ['images', entity, id] as const,
  all: (orgId: string) => ['images', orgId] as const,
};

type Entity = 'organisation' | 'user' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'document' | 'asset';

const imageApi = {
  getAll: (orgId: string) => api.get<AppImage[]>(`/api/image/org/${orgId}`),
  getForEntity: (entity: Entity, id: string) => api.get<AppImage[]>(`/api/image/${entity}/${id}`),
  create: (orgId: string, entityId: string, entity: Entity, data: any) => api.post<AppImage>(`/api/image/${orgId}/${entityId}/${entity}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/image/${id}`),
};

export function useImages(entity: Entity, id: string) {
  return useQuery({ queryKey: imageKeys.forEntity(entity, id), queryFn: () => imageApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateImage(orgId: string, entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: any) => imageApi.create(orgId, entityId, entity, data), onSuccess: () => qc.invalidateQueries({ queryKey: imageKeys.forEntity(entity, entityId) }) });
}

export function useDeleteImage(entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => imageApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: imageKeys.forEntity(entity, entityId) }) });
}
