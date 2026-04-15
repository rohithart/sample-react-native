import type { Notification } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const notificationKeys = {
  all: (orgId: string) => ['notifications', orgId] as const,
};

const notificationApi = {
  getAll: (orgId: string) => api.get<Notification[]>(`/api/notification/${orgId}`),
  markRead: (id: string) => api.patch<Notification>(`/api/notification/read/${id}`, {}),
  markReadAll: (orgId: string) => api.patch<void>(`/api/notification/readAll/${orgId}`, {}),
  delete: (id: string) => api.delete<boolean>(`/api/notification/${id}`),
  deleteAll: (orgId: string) => api.delete<boolean>(`/api/notification/all/${orgId}`),
};

export function useNotifications(orgId: string) {
  return useQuery({ queryKey: notificationKeys.all(orgId), queryFn: () => notificationApi.getAll(orgId), enabled: !!orgId });
}

export function useMarkNotificationRead(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => notificationApi.markRead(id), onSuccess: () => qc.invalidateQueries({ queryKey: notificationKeys.all(orgId) }) });
}

export function useMarkAllNotificationsRead(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: () => notificationApi.markReadAll(orgId), onSuccess: () => qc.invalidateQueries({ queryKey: notificationKeys.all(orgId) }) });
}

export function useDeleteNotification(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => notificationApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: notificationKeys.all(orgId) }) });
}
