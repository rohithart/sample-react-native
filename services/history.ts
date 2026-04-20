import type { History } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';
import { resolveEntityType } from '@/utils/entity';
import { EntityType } from '@/enums';

export const historyKeys = {
  forEntity: (entity: string, id: string) => ['history', entity, id] as const,
};

  const historyApi = {
  get: (entity: EntityType, id: string) => api.get<History[]>(`/api/history/${resolveEntityType(entity)}/${id}`),
  delete: (entity: EntityType, id: string) => api.delete<boolean>(`/api/history/${resolveEntityType(entity)}/${id}`),
};

export function useHistory(entity: EntityType, id: string) {
  return useQuery({ queryKey: historyKeys.forEntity(entity, id), queryFn: () => historyApi.get(entity, id), enabled: !!id });
}

export function useDeleteHistory(entity: EntityType, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => historyApi.delete(entity, id), onSuccess: () => qc.invalidateQueries({ queryKey: historyKeys.forEntity(entity, entityId) }) });
}
