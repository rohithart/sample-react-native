import type { Attachment } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const attachmentKeys = {
  forEntity: (entity: string, id: string) => ['attachments', entity, id] as const,
  all: (orgId: string) => ['attachments', orgId] as const,
};

type Entity = 'organisation' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'meeting' | 'document' | 'asset' | 'information' | 'transaction';

const attachmentApi = {
  getAll: (orgId: string) => api.get<Attachment[]>(`/attachment/org/${orgId}`),
  getForEntity: (entity: Entity, id: string) => api.get<Attachment[]>(`/attachment/${entity}/${id}`),
  create: (orgId: string, entityId: string, entity: Entity, data: any) => api.post<Attachment>(`/attachment/${orgId}/${entityId}/${entity}`, data),
  delete: (id: string) => api.delete<boolean>(`/attachment/${id}`),
};

export function useAttachments(entity: Entity, id: string) {
  return useQuery({ queryKey: attachmentKeys.forEntity(entity, id), queryFn: () => attachmentApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateAttachment(orgId: string, entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: any) => attachmentApi.create(orgId, entityId, entity, data), onSuccess: () => qc.invalidateQueries({ queryKey: attachmentKeys.forEntity(entity, entityId) }) });
}

export function useDeleteAttachment(entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => attachmentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: attachmentKeys.forEntity(entity, entityId) }) });
}
