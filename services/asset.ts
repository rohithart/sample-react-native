import type { Asset } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const assetKeys = {
  all: (orgId: string) => ['asset', orgId] as const,
  detail: (id: string) => ['asset', 'detail', id] as const,
  archived: (orgId: string) => ['asset', orgId, 'archived'] as const,
  forType: (typeId: string) => ['asset', 'type', typeId] as const,
};

const assetApi = {
  getAll: (orgId: string) => api.get<Asset[]>(`/api/asset/org/${orgId}`),
  get: (id: string) => api.get<Asset>(`/api/asset/${id}`),
  create: (orgId: string, data: Partial<Asset>) => api.post<Asset>(`/api/asset/${orgId}`, data),
  update: (id: string, data: Partial<Asset>) => api.put<Asset>(`/api/asset/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/asset/${id}`),
  getAllArchived: (orgId: string) => api.get<Asset[]>(`/api/asset/org/archived/${orgId}`),
  archive: (id: string) => api.patch<Asset>(`/api/asset/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Asset>(`/api/asset/unarchive/${id}`, {}),
  flag: (id: string, data: { reason: string }) => api.patch<Asset>(`/api/asset/flag/${id}`, data),
  unflag: (id: string) => api.patch<Asset>(`/api/asset/unflag/${id}`, {}),
  getAllForAssetType: (typeId: string) => api.get<Asset[]>(`/api/asset/type/${typeId}`),
};

export function useAssets(orgId: string) {
  return useQuery({ queryKey: assetKeys.all(orgId), queryFn: () => assetApi.getAll(orgId), enabled: !!orgId });
}

export function useAsset(id: string) {
  return useQuery({ queryKey: assetKeys.detail(id), queryFn: () => assetApi.get(id), enabled: !!id });
}

export function useCreateAsset(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Asset>) => assetApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: assetKeys.all(orgId) }) });
}

export function useUpdateAsset(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Asset> }) => assetApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: assetKeys.all(orgId) }); qc.invalidateQueries({ queryKey: assetKeys.detail(id) }); } });
}

export function useDeleteAsset(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => assetApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: assetKeys.all(orgId) }) });
}
export function useArchiveAsset(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => assetApi.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: assetKeys.all(orgId) }); } });
}

export function useUnarchiveAsset(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => assetApi.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: assetKeys.all(orgId) }); } });
}
