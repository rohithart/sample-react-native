import type { Information } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const informationKeys = {
  all: (orgId: string) => ['information', orgId] as const,
  detail: (id: string) => ['information', 'detail', id] as const,
};

const informationApi = {
  getAll: (orgId: string) => api.get<Information[]>(`/information/org/${orgId}`),
  get: (id: string) => api.get<Information>(`/information/${id}`),
  create: (orgId: string, data: Partial<Information>) => api.post<Information>(`/information/${orgId}`, data),
  update: (id: string, data: Partial<Information>) => api.put<Information>(`/information/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/information/${id}`),
};

export function useInformations(orgId: string) {
  return useQuery({ queryKey: informationKeys.all(orgId), queryFn: () => informationApi.getAll(orgId), enabled: !!orgId });
}

export function useInformation(id: string) {
  return useQuery({ queryKey: informationKeys.detail(id), queryFn: () => informationApi.get(id), enabled: !!id });
}

export function useCreateInformation(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Information>) => informationApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: informationKeys.all(orgId) }) });
}

export function useUpdateInformation(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Information> }) => informationApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: informationKeys.all(orgId) }); qc.invalidateQueries({ queryKey: informationKeys.detail(id) }); } });
}

export function useDeleteInformation(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => informationApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: informationKeys.all(orgId) }) });
}
