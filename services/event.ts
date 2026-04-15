import type { Event } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const eventKeys = {
  all: (orgId: string) => ['event', orgId] as const,
  detail: (id: string) => ['event', 'detail', id] as const,
  forType: (typeId: string) => ['event', 'type', typeId] as const,
};

const eventApi = {
  getAll: (orgId: string) => api.get<Event[]>(`/api/event/org/${orgId}`),
  get: (id: string) => api.get<Event>(`/api/event/${id}`),
  create: (orgId: string, data: Partial<Event>) => api.post<Event>(`/api/event/${orgId}`, data),
  update: (id: string, data: Partial<Event>) => api.put<Event>(`/api/event/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/event/${id}`),
  getAllForEventType: (typeId: string) => api.get<Event[]>(`/api/event/type/${typeId}`),
};

export function useEvents(orgId: string) {
  return useQuery({ queryKey: eventKeys.all(orgId), queryFn: () => eventApi.getAll(orgId), enabled: !!orgId });
}

export function useEvent(id: string) {
  return useQuery({ queryKey: eventKeys.detail(id), queryFn: () => eventApi.get(id), enabled: !!id });
}

export function useCreateEvent(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Event>) => eventApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: eventKeys.all(orgId) }) });
}

export function useUpdateEvent(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Event> }) => eventApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: eventKeys.all(orgId) }); qc.invalidateQueries({ queryKey: eventKeys.detail(id) }); } });
}

export function useDeleteEvent(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => eventApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: eventKeys.all(orgId) }) });
}
