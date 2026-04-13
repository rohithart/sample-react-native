import type { AssetType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const assetTypeKeys = {
  all: (orgId: string) => ['assetType', orgId] as const,
  detail: (id: string) => ['assetType', 'detail', id] as const,
};

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------
const assetTypeApi = {
  getAll: (orgId: string) => api.get<AssetType[]>(`/asset-type/org/${orgId}`),
  get: (id: string) => api.get<AssetType>(`/asset-type/${id}`),
  create: (orgId: string, data: Partial<AssetType>) => api.post<AssetType>(`/asset-type/${orgId}`, data),
  update: (id: string, data: Partial<AssetType>) => api.put<AssetType>(`/asset-type/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/asset-type/${id}`),
};

// ---------------------------------------------------------------------------
// Query hooks
// ---------------------------------------------------------------------------
export function useAssetTypes(orgId: string) {
  return useQuery({ queryKey: assetTypeKeys.all(orgId), queryFn: () => assetTypeApi.getAll(orgId), enabled: !!orgId });
}

export function useAssetType(id: string) {
  return useQuery({ queryKey: assetTypeKeys.detail(id), queryFn: () => assetTypeApi.get(id), enabled: !!id });
}

// ---------------------------------------------------------------------------
// Mutation hooks
// ---------------------------------------------------------------------------
export function useCreateAssetType(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<AssetType>) => assetTypeApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: assetTypeKeys.all(orgId) }) });
}

export function useUpdateAssetType(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<AssetType> }) => assetTypeApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: assetTypeKeys.all(orgId) }); qc.invalidateQueries({ queryKey: assetTypeKeys.detail(id) }); } });
}

export function useDeleteAssetType(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => assetTypeApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: assetTypeKeys.all(orgId) }) });
}
