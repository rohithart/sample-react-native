import type { Vendor } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const vendorKeys = {
  all: (orgId: string) => ['vendor', orgId] as const,
  detail: (id: string) => ['vendor', 'detail', id] as const,
  archived: (orgId: string) => ['vendor', orgId, 'archived'] as const,
};

const vendorApi = {
  getAll: (orgId: string) => api.get<Vendor[]>(`/api/vendor/org/${orgId}`),
  get: (id: string) => api.get<Vendor>(`/api/vendor/${id}`),
  create: (orgId: string, data: Partial<Vendor>) => api.post<Vendor>(`/api/vendor/${orgId}`, data),
  update: (id: string, data: Partial<Vendor>) => api.put<Vendor>(`/api/vendor/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/vendor/${id}`),
  getAllArchived: (orgId: string) => api.get<Vendor[]>(`/api/vendor/org/archived/${orgId}`),
  archive: (id: string) => api.patch<Vendor>(`/api/vendor/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Vendor>(`/api/vendor/unarchive/${id}`, {}),
};

export function useVendors(orgId: string) {
  return useQuery({ queryKey: vendorKeys.all(orgId), queryFn: () => vendorApi.getAll(orgId), enabled: !!orgId });
}

export function useVendor(id: string) {
  return useQuery({ queryKey: vendorKeys.detail(id), queryFn: () => vendorApi.get(id), enabled: !!id });
}

export function useCreateVendor(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Vendor>) => vendorApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: vendorKeys.all(orgId) }) });
}

export function useUpdateVendor(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Vendor> }) => vendorApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: vendorKeys.all(orgId) }); qc.invalidateQueries({ queryKey: vendorKeys.detail(id) }); } });
}

export function useDeleteVendor(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => vendorApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: vendorKeys.all(orgId) }) });
}
export function useArchiveVendor(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => vendorApi.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: vendorKeys.all(orgId) }); } });
}

export function useUnarchiveVendor(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => vendorApi.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: vendorKeys.all(orgId) }); } });
}
