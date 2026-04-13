import type { VendorSubmission } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const vendorSubmitKeys = {
  forEntity: (entity: string, id: string) => ['vendorSubmit', entity, id] as const,
};

type Entity = 'evidence' | 'quote' | 'invoice' | 'workorder';

const vendorSubmitApi = {
  getForVendor: (entity: Entity, id: string) => api.patch<VendorSubmission>(`/vendor-submit/${entity}/${id}`, {}),
  getFiles: (entity: Entity, id: string) => api.get<any[]>(`/vendor-submit/${entity}/files/${id}`),
  getImages: (entity: Entity, id: string) => api.get<any[]>(`/vendor-submit/${entity}/images/${id}`),
  getComments: (entity: Entity, id: string) => api.get<any[]>(`/vendor-submit/${entity}/comment/${id}`),
  update: (entity: Entity, id: string, data: any) => api.post<VendorSubmission>(`/vendor-submit/${entity}/${id}`, data),
  submit: (entity: Entity, id: string) => api.post<VendorSubmission>(`/vendor-submit/${entity}/submit/${id}`, {}),
  uploadFile: (entity: Entity, orgId: string, id: string, data: any) => api.post<any>(`/vendor-submit/${entity}/file/${orgId}/${id}`, data),
  createComment: (id: string, data: any) => api.post<any>(`/vendor-submit/comment/${id}`, data),
};

export function useVendorSubmission(entity: Entity, id: string) {
  return useQuery({ queryKey: vendorSubmitKeys.forEntity(entity, id), queryFn: () => vendorSubmitApi.getForVendor(entity, id), enabled: !!id });
}

export function useVendorSubmitFiles(entity: Entity, id: string) {
  return useQuery({ queryKey: [...vendorSubmitKeys.forEntity(entity, id), 'files'], queryFn: () => vendorSubmitApi.getFiles(entity, id), enabled: !!id });
}

export function useUpdateVendorSubmission(entity: Entity) {
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: any }) => vendorSubmitApi.update(entity, id, data) });
}

export function useSubmitVendorSubmission(entity: Entity) {
  return useMutation({ mutationFn: (id: string) => vendorSubmitApi.submit(entity, id) });
}
