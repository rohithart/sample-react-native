import type { Announcement } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const announcementKeys = {
  all: (orgId: string) => ['announcements', orgId] as const,
  forUser: (orgId: string) => ['announcements', orgId, 'user'] as const,
  latest: (orgId: string) => ['announcements', orgId, 'latest'] as const,
  detail: (id: string) => ['announcements', 'detail', id] as const,
};

const announcementApi = {
  getAll: (orgId: string) => api.get<Announcement[]>(`/announcement/org/${orgId}`),
  getAllForGroup: (orgId: string, groupId: string) => api.get<Announcement[]>(`/announcement/org/${orgId}/group/${groupId}`),
  getAllForUser: (orgId: string) => api.get<Announcement[]>(`/announcement/user/${orgId}`),
  getLatest: (orgId: string) => api.get<Announcement[]>(`/announcement/latest/${orgId}`),
  getForUser: (orgId: string, id: string) => api.get<Announcement>(`/announcement/view/${orgId}/${id}`),
  get: (id: string) => api.get<Announcement>(`/announcement/${id}`),
  create: (orgId: string, data: Partial<Announcement>) => api.post<Announcement>(`/announcement/${orgId}`, data),
  delete: (id: string) => api.delete<boolean>(`/announcement/${id}`),
};

export function useAnnouncements(orgId: string) {
  return useQuery({ queryKey: announcementKeys.all(orgId), queryFn: () => announcementApi.getAll(orgId), enabled: !!orgId });
}

export function useAnnouncement(id: string) {
  return useQuery({ queryKey: announcementKeys.detail(id), queryFn: () => announcementApi.get(id), enabled: !!id });
}

export function useCreateAnnouncement(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Announcement>) => announcementApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: announcementKeys.all(orgId) }) });
}

export function useDeleteAnnouncement(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => announcementApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: announcementKeys.all(orgId) }) });
}
