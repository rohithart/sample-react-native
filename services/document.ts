import type { Document } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const documentKeys = {
  all: (orgId: string) => ['document', orgId] as const,
  detail: (id: string) => ['document', 'detail', id] as const,
  archived: (orgId: string) => ['document', orgId, 'archived'] as const,
  forFolder: (folderId: string) => ['document', 'folder', folderId] as const,
};

const documentApi = {
  getAll: (orgId: string) => api.get<Document[]>(`/document/org/${orgId}`),
  get: (id: string) => api.get<Document>(`/document/${id}`),
  create: (orgId: string, data: Partial<Document>) => api.post<Document>(`/document/${orgId}`, data),
  update: (id: string, data: Partial<Document>) => api.put<Document>(`/document/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/document/${id}`),
  getAllArchived: (orgId: string) => api.get<Document[]>(`/document/org/archived/${orgId}`),
  archive: (id: string) => api.patch<Document>(`/document/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Document>(`/document/unarchive/${id}`, {}),
  flag: (id: string, data: { reason: string }) => api.patch<Document>(`/document/flag/${id}`, data),
  unflag: (id: string) => api.patch<Document>(`/document/unflag/${id}`, {}),
  getAllFolder: (folderId: string) => api.get<Document[]>(`/document/folder/${folderId}`),
  getAllArchivedFolder: (folderId: string) => api.get<Document[]>(`/document/folder/archived/${folderId}`),
  move: (id: string, data: { folderId: string }) => api.patch<Document>(`/document/move/${id}`, data),
};

export function useDocuments(orgId: string) {
  return useQuery({ queryKey: documentKeys.all(orgId), queryFn: () => documentApi.getAll(orgId), enabled: !!orgId });
}

export function useDocument(id: string) {
  return useQuery({ queryKey: documentKeys.detail(id), queryFn: () => documentApi.get(id), enabled: !!id });
}

export function useCreateDocument(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Document>) => documentApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: documentKeys.all(orgId) }) });
}

export function useUpdateDocument(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Document> }) => documentApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: documentKeys.all(orgId) }); qc.invalidateQueries({ queryKey: documentKeys.detail(id) }); } });
}

export function useDeleteDocument(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => documentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: documentKeys.all(orgId) }) });
}
export function useArchiveDocument(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => documentApi.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: documentKeys.all(orgId) }); } });
}

export function useUnarchiveDocument(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => documentApi.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: documentKeys.all(orgId) }); } });
}
