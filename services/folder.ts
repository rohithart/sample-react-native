import type { Folder } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const folderKeys = {
  all: (orgId: string) => ['folders', orgId] as const,
  recursive: (orgId: string) => ['folders', orgId, 'recursive'] as const,
  detail: (id: string) => ['folders', 'detail', id] as const,
};

const folderApi = {
  getAll: (orgId: string) => api.get<Folder[]>(`/api/folder/org/${orgId}`),
  getAllRecursive: (orgId: string) => api.get<Folder[]>(`/api/folder/org/recursive/${orgId}`),
  get: (id: string) => api.get<Folder>(`/api/folder/${id}`),
  getAllSubfolder: (orgId: string) => api.get<Folder[]>(`/api/folder/subfolder/${orgId}`),
  move: (id: string, data: { parentId: string }) => api.patch<Folder>(`/api/folder/move/${id}`, data),
  create: (orgId: string, data: Partial<Folder>) => api.post<Folder>(`/api/folder/${orgId}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/folder/${id}`),
};

export function useFolders(orgId: string) {
  return useQuery({ queryKey: folderKeys.all(orgId), queryFn: () => folderApi.getAll(orgId), enabled: !!orgId });
}

export function useFolder(id: string) {
  return useQuery({ queryKey: folderKeys.detail(id), queryFn: () => folderApi.get(id), enabled: !!id });
}

export function useCreateFolder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Folder>) => folderApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all(orgId) }) });
}

export function useDeleteFolder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => folderApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all(orgId) }) });
}
