import type { Vote } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const voteKeys = {
  all: (orgId: string) => ['votes', orgId] as const,
  allForUser: (orgId: string) => ['votes', orgId, 'all-user'] as const,
  archived: (orgId: string) => ['votes', orgId, 'archived'] as const,
  forUser: (orgId: string) => ['votes', orgId, 'user'] as const,
  forWorkflow: (wId: string) => ['votes', 'workflow', wId] as const,
  detail: (id: string) => ['votes', 'detail', id] as const,
  casted: (id: string) => ['votes', 'casted', id] as const,
};

const voteApi = {
  getAll: (orgId: string) => api.get<Vote[]>(`/api/vote/org/${orgId}`),
  getAllForGroup: (orgId: string, groupId: string) => api.get<Vote[]>(`/api/vote/org/${orgId}/group/${groupId}`),
  getAllArchived: (orgId: string) => api.get<Vote[]>(`/api/vote/org/archived/${orgId}`),
  getAllForUser: (orgId: string) => api.get<Vote[]>(`/api/vote/user/${orgId}`),
  getForUser: (orgId: string, id: string) => api.get<Vote>(`/api/vote/view/${orgId}/${id}`),
  getAllForWorkflow: (wId: string) => api.get<Vote[]>(`/api/vote/workflow/${wId}`),
  get: (id: string) => api.get<Vote>(`/api/vote/${id}`),
  getAllCasted: (id: string) => api.get<any>(`/api/vote/all-casted/${id}`),
  getCasted: (orgId: string, id: string) => api.get<any>(`/api/vote/casted/${orgId}/${id}`),
  create: (orgId: string, data: Partial<Vote>) => api.post<Vote>(`/api/vote/${orgId}`, data),
  complete: (id: string) => api.patch<Vote>(`/api/vote/finish/${id}`, {}),
  remind: (id: string) => api.patch<Vote>(`/api/vote/remind/${id}`, {}),
  cast: (orgId: string, id: string, data: any) => api.patch<Vote>(`/api/vote/cast/${orgId}/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/vote/${id}`),
};

export function useVotes(orgId: string) {
  return useQuery({ queryKey: voteKeys.all(orgId), queryFn: () => voteApi.getAll(orgId), enabled: !!orgId });
}

export function useVotesForUser(orgId: string) {
  return useQuery({ queryKey: voteKeys.allForUser(orgId), queryFn: () => voteApi.getAllForUser(orgId), enabled: !!orgId });
}

export function useVote(id: string) {
  return useQuery({ queryKey: voteKeys.detail(id), queryFn: () => voteApi.get(id), enabled: !!id });
}

export function useArchivedVotes(orgId: string) {
  return useQuery({ queryKey: voteKeys.archived(orgId), queryFn: () => voteApi.getAllArchived(orgId), enabled: !!orgId });
}

export function useCreateVote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Vote>) => voteApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: voteKeys.all(orgId) }) });
}

export function useDeleteVote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => voteApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: voteKeys.all(orgId) }) });
}

export function useAllCastedVotes(id: string) {
  return useQuery({ queryKey: voteKeys.casted(id), queryFn: () => voteApi.getAllCasted(id), enabled: !!id });
}

export function useCastedVote(orgId: string, id: string) {
  return useQuery({ queryKey: [...voteKeys.casted(id), 'user', orgId], queryFn: () => voteApi.getCasted(orgId, id), enabled: !!orgId && !!id });
}

export function useCastVote(orgId: string, id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { index: number }) => voteApi.cast(orgId, id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: voteKeys.casted(id) });
      qc.invalidateQueries({ queryKey: [...voteKeys.casted(id), 'user', orgId] });
    }
  });
}
