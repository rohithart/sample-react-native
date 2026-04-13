import type { EventType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const eventTypeKeys = {
  all: (orgId: string) => ['eventType', orgId] as const,
  detail: (id: string) => ['eventType', 'detail', id] as const,
};

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------
const eventTypeApi = {
  getAll: (orgId: string) => api.get<EventType[]>(`/event-type/org/${orgId}`),
  get: (id: string) => api.get<EventType>(`/event-type/${id}`),
  create: (orgId: string, data: Partial<EventType>) => api.post<EventType>(`/event-type/${orgId}`, data),
  update: (id: string, data: Partial<EventType>) => api.put<EventType>(`/event-type/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/event-type/${id}`),
};

// ---------------------------------------------------------------------------
// Query hooks
// ---------------------------------------------------------------------------
export function useEventTypes(orgId: string) {
  return useQuery({ queryKey: eventTypeKeys.all(orgId), queryFn: () => eventTypeApi.getAll(orgId), enabled: !!orgId });
}

export function useEventType(id: string) {
  return useQuery({ queryKey: eventTypeKeys.detail(id), queryFn: () => eventTypeApi.get(id), enabled: !!id });
}

// ---------------------------------------------------------------------------
// Mutation hooks
// ---------------------------------------------------------------------------
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
