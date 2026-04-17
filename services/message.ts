import type { Message } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const messageKeys = {
  forConversation: (conversationId: string) => ['messages', conversationId] as const,
  detail: (id: string) => ['messages', 'detail', id] as const,
};

const messageApi = {
  getForConversation: (conversationId: string, limit = 50, skip = 0) => api.get<Message[]>(`/api/message/conversation/${conversationId}?limit=${limit}&skip=${skip}`),
  get: (id: string) => api.get<Message>(`/api/message/${id}`),
  send: (conversationId: string, data: { message: string, organisation: string }) => api.post<Message>(`/api/message/send/${conversationId}`, data),
  markRead: (orgId: string, conversationId: string) => api.put<void>(`/api/message/read/${orgId}/${conversationId}`, {}),
  toggleReaction: (messageId: string, data: any) => api.put<Message>(`/api/message/react/${messageId}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/message/${id}`),
};

export function useMessages(conversationId: string) {
  return useQuery({ queryKey: messageKeys.forConversation(conversationId), queryFn: () => messageApi.getForConversation(conversationId), enabled: !!conversationId });
}

export function useSendMessage(conversationId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: { message: string, organisation: string }) => messageApi.send(conversationId, data), onSuccess: () => qc.invalidateQueries({ queryKey: messageKeys.forConversation(conversationId) }) });
}

export function useDeleteMessage(conversationId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => messageApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: messageKeys.forConversation(conversationId) }) });
}

export function useToggleReaction(messageId: string, conversationId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: any) => messageApi.toggleReaction(messageId, data), onSuccess: () => qc.invalidateQueries({ queryKey: messageKeys.forConversation(conversationId) }) });
}
