import type { Timeline } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';
import { EntityType } from '@/enums';
import { resolveEntityType } from '@/utils/entity';

export const timelineKeys = {
  forEntity: (entity: string, id: string) => ['timeline', entity, id] as const,
};

const timelineApi = {
  get: (entity: EntityType, id: string) => api.get<Timeline[]>(`/api/timeline/${resolveEntityType(entity)}/${id}`),
};

export function useTimeline(entity: EntityType, id: string) {
  return useQuery({ queryKey: timelineKeys.forEntity(entity, id), queryFn: () => timelineApi.get(entity, id), enabled: !!id });
}
