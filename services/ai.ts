import type { AITokenDetails, AIContent } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const aiKeys = {
  yearlyTokens: (orgId: string) => ['ai', 'tokens', 'year', orgId] as const,
  monthlyTokens: (orgId: string) => ['ai', 'tokens', 'month', orgId] as const,
  forEntity: (entity: string, id: string) => ['ai', entity, id] as const,
};

type Entity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'meeting' | 'document' | 'asset';

const aiApi = {
  getYearlyTokens: (orgId: string) => api.get<AITokenDetails>(`/ai/token/year/${orgId}`),
  getMonthlyTokens: (orgId: string) => api.get<AITokenDetails>(`/ai/token/month/${orgId}`),
  get: (entity: Entity, id: string) => api.get<AIContent>(`/ai/${entity}/${id}`),
  create: (entity: Entity, id: string) => api.post<AIContent>(`/ai/${entity}/${id}`, {}),
};

export function useAIContent(entity: Entity, id: string) {
  return useQuery({ queryKey: aiKeys.forEntity(entity, id), queryFn: () => aiApi.get(entity, id), enabled: !!id });
}

export function useGenerateAIContent(entity: Entity) {
  return useMutation({ mutationFn: (id: string) => aiApi.create(entity, id) });
}

export function useAIYearlyTokens(orgId: string) {
  return useQuery({ queryKey: aiKeys.yearlyTokens(orgId), queryFn: () => aiApi.getYearlyTokens(orgId), enabled: !!orgId });
}
