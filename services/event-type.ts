import type { EventType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const eventTypeKeys = {
  all: (orgId: string) => ['eventType', orgId] as const,
  detail: (id: string) => ['eventType', 'detail', id] as const,
};

const eventTypeApi = {
  getAll: (orgId: string) => api.get<EventType[]>(`/api/event-type/org/${orgId}`),
  get: (id: string) => api.get<EventType>(`/api/event-type/${id}`),
  create: (orgId: string, data: Partial<EventType>) => api.post<EventType>(`/api/event-type/${orgId}`, data),
  update: (id: string, data: Partial<EventType>) => api.put<EventType>(`/api/event-type/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/event-type/${id}`),
};

export function useEventTypes(orgId: string) {
  return useQuery({ queryKey: eventTypeKeys.all(orgId), queryFn: () => eventTypeApi.getAll(orgId), enabled: !!orgId });
}

export function useEventType(id: string) {
  return useQuery({ queryKey: eventTypeKeys.detail(id), queryFn: () => eventTypeApi.get(id), enabled: !!id });
}

export function useCreateEventType(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<EventType>) => eventTypeApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: eventTypeKeys.all(orgId) }) });
}

export function useUpdateEventType(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<EventType> }) => eventTypeApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: eventTypeKeys.all(orgId) }); qc.invalidateQueries({ queryKey: eventTypeKeys.detail(id) }); } });
}

export function useDeleteEventType(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => eventTypeApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: eventTypeKeys.all(orgId) }) });
}
