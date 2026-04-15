import type { Conversation } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const conversationKeys = {
  forGroup: (groupId: string, orgId: string) => ['conversations', 'group', groupId, orgId] as const,
  detail: (id: string) => ['conversations', 'detail', id] as const,
};

const conversationApi = {
  getForGroup: (groupId: string, orgId: string) => api.get<Conversation>(`/api/conversation/group/${groupId}/${orgId}`),
  get: (id: string) => api.get<Conversation>(`/api/conversation/${id}`),
  create: (id: string, data: Partial<Conversation>) => api.post<Conversation>(`/api/conversation/${id}`, data),
};

export function useConversation(id: string) {
  return useQuery({ queryKey: conversationKeys.detail(id), queryFn: () => conversationApi.get(id), enabled: !!id });
}

export function useCreateConversation() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Conversation> }) => conversationApi.create(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['conversations'] }) });
}
