import type { AppImage } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';
import { EntityType } from '@/enums';
import { resolveEntityType } from '@/utils/entity';

export const imageKeys = {
  forEntity: (entity: string, id: string) => ['images', entity, id] as const,
  all: (orgId: string) => ['images', orgId] as const,
};

const imageApi = {
  getAll: (orgId: string) => api.get<AppImage[]>(`/api/image/org/${orgId}`),
  getForEntity: (entity: EntityType, id: string) => api.get<AppImage[]>(`/api/image/${resolveEntityType(entity)}/${id}`),
  create: (orgId: string, entityId: string, entity: EntityType , data: any) => api.post<AppImage>(`/api/image/${orgId}/${entityId}/${entity}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/image/${id}`),
};

export function useImages(entity: EntityType, id: string) {
  return useQuery({ queryKey: imageKeys.forEntity(entity, id), queryFn: () => imageApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateImage(orgId: string, entity: EntityType, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: any) => imageApi.create(orgId, entityId, entity, data), onSuccess: () => qc.invalidateQueries({ queryKey: imageKeys.forEntity(entity, entityId) }) });
}

export function useDeleteImage(entity: EntityType, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => imageApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: imageKeys.forEntity(entity, entityId) }) });
}
