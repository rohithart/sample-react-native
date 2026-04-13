import type { TimelineEntry } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const timelineKeys = {
  forEntity: (entity: string, id: string) => ['timeline', entity, id] as const,
};

type Entity = 'user' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'vote' | 'vendor' | 'document' | 'asset' | 'financial-year';

const timelineApi = {
  get: (entity: Entity, id: string) => api.get<TimelineEntry[]>(`/timeline/${entity}/${id}`),
};

export function useTimeline(entity: Entity, id: string) {
  return useQuery({ queryKey: timelineKeys.forEntity(entity, id), queryFn: () => timelineApi.get(entity, id), enabled: !!id });
}
