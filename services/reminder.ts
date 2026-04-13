import type { Reminder } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const reminderKeys = {
  all: (orgId: string) => ['reminders', orgId] as const,
  upcoming: (orgId: string) => ['reminders', orgId, 'upcoming'] as const,
  detail: (id: string) => ['reminders', 'detail', id] as const,
};

const reminderApi = {
  getAll: (orgId: string) => api.get<Reminder[]>(`/reminder/organisation/${orgId}`),
  get: (id: string) => api.get<Reminder>(`/reminder/${id}`),
  getUpcoming: (orgId: string) => api.get<Reminder[]>(`/reminder/upcoming/${orgId}`),
  create: (orgId: string, data: Partial<Reminder>) => api.post<Reminder>(`/reminder/${orgId}`, data),
  update: (id: string, data: Partial<Reminder>) => api.put<Reminder>(`/reminder/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/reminder/${id}`),
  enable: (id: string) => api.patch<Reminder>(`/reminder/enable/${id}`, {}),
  disable: (id: string) => api.patch<Reminder>(`/reminder/disable/${id}`, {}),
};

export function useReminders(orgId: string) {
  return useQuery({ queryKey: reminderKeys.all(orgId), queryFn: () => reminderApi.getAll(orgId), enabled: !!orgId });
}

export function useUpcomingReminders(orgId: string) {
  return useQuery({ queryKey: reminderKeys.upcoming(orgId), queryFn: () => reminderApi.getUpcoming(orgId), enabled: !!orgId });
}

export function useReminder(id: string) {
  return useQuery({ queryKey: reminderKeys.detail(id), queryFn: () => reminderApi.get(id), enabled: !!id });
}

export function useCreateReminder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Reminder>) => reminderApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: reminderKeys.all(orgId) }) });
}

export function useUpdateReminder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Reminder> }) => reminderApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: reminderKeys.all(orgId) }); qc.invalidateQueries({ queryKey: reminderKeys.detail(id) }); } });
}

export function useDeleteReminder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => reminderApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: reminderKeys.all(orgId) }) });
}
