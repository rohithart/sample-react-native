import type { VendorComment } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const vendorCommentKeys = {
  all: (id: string) => ['vendorComments', id] as const,
  forEntity: (entity: string, id: string) => ['vendorComments', entity, id] as const,
};

type Entity = 'quote' | 'invoice' | 'workorder' | 'evidence';

const vendorCommentApi = {
  getAll: (id: string) => api.get<VendorComment[]>(`/api/vendor-comment/${id}`),
  getForEntity: (entity: Entity, id: string) => api.get<VendorComment[]>(`/api/vendor-comment/${entity}/${id}`),
  create: (orgId: string, data: Partial<VendorComment>) => api.post<VendorComment>(`/api/vendor-comment/${orgId}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/vendor-comment/${id}`),
};

export function useVendorComments(id: string) {
  return useQuery({ queryKey: vendorCommentKeys.all(id), queryFn: () => vendorCommentApi.getAll(id), enabled: !!id });
}

export function useVendorCommentsForEntity(entity: Entity, id: string) {
  return useQuery({ queryKey: vendorCommentKeys.forEntity(entity, id), queryFn: () => vendorCommentApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateVendorComment(orgId: string, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<VendorComment>) => vendorCommentApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: vendorCommentKeys.all(entityId) }) });
}

export function useDeleteVendorComment(entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => vendorCommentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: vendorCommentKeys.all(entityId) }) });
}
