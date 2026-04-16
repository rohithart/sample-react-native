import type { Meeting } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const meetingKeys = {
  all: (orgId: string) => ['meeting', orgId] as const,
  detail: (id: string) => ['meeting', 'detail', id] as const,
  archived: (orgId: string) => ['meeting', orgId, 'archived'] as const,
  forUser: (orgId: string) => ['meeting', orgId, 'user'] as const,
  forGroup: (orgId: string, groupId: string) => ['meeting', orgId, 'group', groupId] as const,
};

const meetingApi = {
  getAll: (orgId: string) => api.get<Meeting[]>(`/api/meeting/org/${orgId}`),
  get: (id: string) => api.get<Meeting>(`/api/meeting/${id}`),
  create: (orgId: string, data: Partial<Meeting>) => api.post<Meeting>(`/api/meeting/${orgId}`, data),
  update: (id: string, data: Partial<Meeting>) => api.put<Meeting>(`/api/meeting/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/meeting/${id}`),
  getAllArchived: (orgId: string) => api.get<Meeting[]>(`/api/meeting/org/archived/${orgId}`),
  archive: (id: string) => api.patch<Meeting>(`/api/meeting/archive/${id}`, {}),
  unarchive: (id: string) => api.patch<Meeting>(`/api/meeting/unarchive/${id}`, {}),
  getAllForGroup: (orgId: string, groupId: string) => api.get<Meeting[]>(`/api/meeting/org/${orgId}/group/${groupId}`),
  getAllForUser: (orgId: string) => api.get<Meeting[]>(`/api/meeting/user/${orgId}`),
  getForUser: (orgId: string, id: string) => api.get<Meeting>(`/api/meeting/view/${orgId}/${id}`),
  sendGoogleInvite: (id: string) => api.patch<Meeting>(`/api/meeting/google-invite/${id}`, {}),
  remind: (id: string) => api.patch<Meeting>(`/api/meeting/remind/${id}`, {}),
};

export function useMeetings(orgId: string) {
  return useQuery({ queryKey: meetingKeys.all(orgId), queryFn: () => meetingApi.getAll(orgId), enabled: !!orgId });
}

export function useMeetingsForUser(orgId: string) {
  return useQuery({ queryKey: meetingKeys.forUser(orgId), queryFn: () => meetingApi.getAllForUser(orgId), enabled: !!orgId });
}

export function useMeeting(id: string) {
  return useQuery({ queryKey: meetingKeys.detail(id), queryFn: () => meetingApi.get(id), enabled: !!id });
}

export function useArchivedMeetings(orgId: string) {
  return useQuery({ queryKey: meetingKeys.archived(orgId), queryFn: () => meetingApi.getAllArchived(orgId), enabled: !!orgId });
}

export function useCreateMeeting(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Meeting>) => meetingApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: meetingKeys.all(orgId) }) });
}

export function useUpdateMeeting(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Meeting> }) => meetingApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: meetingKeys.all(orgId) }); qc.invalidateQueries({ queryKey: meetingKeys.detail(id) }); } });
}

export function useDeleteMeeting(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => meetingApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: meetingKeys.all(orgId) }) });
}
export function useArchiveMeeting(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => meetingApi.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: meetingKeys.all(orgId) }); } });
}

export function useUnarchiveMeeting(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => meetingApi.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: meetingKeys.all(orgId) }); } });
}
