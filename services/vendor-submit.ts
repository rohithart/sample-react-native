import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from './api-client';
import { resolveEntityType } from '@/utils/entity';
import { EntityType } from '@/enums';

export const vendorSubmitKeys = {
  forEntity: (entity: string, id: string) => ['vendorSubmit', entity, id] as const,
};

const vendorSubmitApi = {
  getForVendor: (entity: EntityType, id: string) => api.patch<any>(`/api/vendor-submit/${resolveEntityType(entity)}/${id}`, {}),
  getFiles: (entity: EntityType, id: string) => api.get<any[]>(`/api/vendor-submit/${resolveEntityType(entity)}/files/${id}`),
  getImages: (entity: EntityType, id: string) => api.get<any[]>(`/api/vendor-submit/${resolveEntityType(entity)}/images/${id}`),
  getComments: (entity: EntityType, id: string) => api.get<any[]>(`/api/vendor-submit/${resolveEntityType(entity)}/comment/${id}`),
  update: (entity: EntityType, id: string, data: any) => api.post<any>(`/api/vendor-submit/${resolveEntityType(entity)}/${id}`, data),
  submit: (entity: EntityType, id: string) => api.post<any>(`/api/vendor-submit/${resolveEntityType(entity)}/submit/${id}`, {}),
  uploadFile: (entity: EntityType, orgId: string, id: string, data: any) => api.post<any>(`/api/vendor-submit/${resolveEntityType(entity)}/file/${orgId}/${id}`, data),
  createComment: (id: string, data: any) => api.post<any>(`/api/vendor-submit/comment/${id}`, data),
};

export function useVendorSubmission(entity: EntityType, id: string) {
  return useQuery({ queryKey: vendorSubmitKeys.forEntity(entity, id), queryFn: () => vendorSubmitApi.getForVendor(entity, id), enabled: !!id });
}

export function useVendorSubmitFiles(entity: EntityType, id: string) {
  return useQuery({ queryKey: [...vendorSubmitKeys.forEntity(entity, id), 'files'], queryFn: () => vendorSubmitApi.getFiles(entity, id), enabled: !!id });
}

export function useUpdateVendorSubmission(entity: EntityType) {
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: any }) => vendorSubmitApi.update(entity, id, data) });
}

export function useSubmitVendorSubmission(entity: EntityType) {
  return useMutation({ mutationFn: (id: string) => vendorSubmitApi.submit(entity, id) });
}
