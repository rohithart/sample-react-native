import type { Vendor } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const vendorKeys = {
  all: (orgId: string) => ['vendor', orgId] as const,
  detail: (id: string) => ['vendor', 'detail', id] as const,
  archived: (orgId: string) => ['vendor', orgId, 'archived'] as const,
};

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------
const vendorApi = {
  getAll: (orgId: string) => api.get<Vendor[]>(`/vendor/org/${orgId}`),
  get: (id: string) => api.get<Vendor>(`/vendor/${id}`),
  create: (orgId: string, data: Partial<Vendor>) => api.post<Vendor>(`/vendor/${orgId}`, data),
  update: (id: string, data: Partial<Vendor>) => api.put<Vendor>(`/vendor/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/vendor/${id}`),
  getAllArchived: (orgId: string) => api.get<Vendor[]>(`/vendor/org/archived/${orgId}`),
  archive: (id: string) => api.patch<Vendor>(`/vendor/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Vendor>(`/vendor/unarchive/${id}`, {}),
};

// ---------------------------------------------------------------------------
// Query hooks
// ---------------------------------------------------------------------------
export function useVendors(orgId: string) {
  return useQuery({ queryKey: vendorKeys.all(orgId), queryFn: () => vendorApi.getAll(orgId), enabled: !!orgId });
}

export function useVendor(id: string) {
  return useQuery({ queryKey: vendorKeys.detail(id), queryFn: () => vendorApi.get(id), enabled: !!id });
}

// ---------------------------------------------------------------------------
// Mutation hooks
// ---------------------------------------------------------------------------
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
