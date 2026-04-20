import type { AITokenDetails, AIContent } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from './api-client';
import { EntityType } from '@/enums';
import { resolveEntityType } from '@/utils/entity';

export const aiKeys = {
  yearlyTokens: (orgId: string) => ['ai', 'tokens', 'year', orgId] as const,
  monthlyTokens: (orgId: string) => ['ai', 'tokens', 'month', orgId] as const,
  forEntity: (entity: string, id: string) => ['ai', entity, id] as const,
};

const aiApi = {
  getYearlyTokens: (orgId: string) => api.get<AITokenDetails>(`/api/ai/token/year/${orgId}`),
  getMonthlyTokens: (orgId: string) => api.get<AITokenDetails>(`/api/ai/token/month/${orgId}`),
  get: (entity: EntityType, id: string) => api.get<AIContent>(`/api/ai/${resolveEntityType(entity)}/${id}`),
  create: (entity: EntityType, id: string) => api.post<AIContent>(`/api/ai/${resolveEntityType(entity)}/${id}`, {}),
};

export function useAIContent(entity: EntityType, id: string) {
  return useQuery({ queryKey: aiKeys.forEntity(entity, id), queryFn: () => aiApi.get(entity, id), enabled: !!id });
}

export function useGenerateAIContent(entity: EntityType) {
  return useMutation({ mutationFn: (id: string) => aiApi.create(entity, id) });
}

export function useAIYearlyTokens(orgId: string) {
  return useQuery({ queryKey: aiKeys.yearlyTokens(orgId), queryFn: () => aiApi.getYearlyTokens(orgId), enabled: !!orgId });
}
