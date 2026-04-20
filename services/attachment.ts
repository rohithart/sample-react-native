import type { Attachment } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';
import { EntityType } from '@/enums';
import { resolveEntityType } from '@/utils/entity';

export const attachmentKeys = {
  forEntity: (entity: string, id: string) => ['attachments', entity, id] as const,
  all: (orgId: string) => ['attachments', orgId] as const,
};

const attachmentApi = {
  getAll: (orgId: string) => api.get<Attachment[]>(`/api/attachment/org/${orgId}`),
  getForEntity: (entity: EntityType, id: string) => api.get<Attachment[]>(`/api/attachment/${resolveEntityType(entity)}/${id}`),
  create: (orgId: string, entityId: string, entity: EntityType, data: any) => api.post<Attachment>(`/api/attachment/${orgId}/${entityId}/${entity}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/attachment/${id}`),
};

export function useAttachments(entity: EntityType, id: string) {
  return useQuery({ queryKey: attachmentKeys.forEntity(entity, id), queryFn: () => attachmentApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateAttachment(orgId: string, entity: EntityType, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: any) => attachmentApi.create(orgId, entityId, entity, data), onSuccess: () => qc.invalidateQueries({ queryKey: attachmentKeys.forEntity(entity, entityId) }) });
}

export function useDeleteAttachment(entity: EntityType, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => attachmentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: attachmentKeys.forEntity(entity, entityId) }) });
}
