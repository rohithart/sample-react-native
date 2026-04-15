import type { History } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const historyKeys = {
  forEntity: (entity: string, id: string) => ['history', entity, id] as const,
};

type Entity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence';

const historyApi = {
  get: (entity: Entity, id: string) => api.get<History[]>(`/api/history/${entity}/${id}`),
  delete: (entity: Entity, id: string) => api.delete<boolean>(`/api/history/${entity}/${id}`),
};

export function useHistory(entity: Entity, id: string) {
  return useQuery({ queryKey: historyKeys.forEntity(entity, id), queryFn: () => historyApi.get(entity, id), enabled: !!id });
}

export function useDeleteHistory(entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => historyApi.delete(entity, id), onSuccess: () => qc.invalidateQueries({ queryKey: historyKeys.forEntity(entity, entityId) }) });
}
