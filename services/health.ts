import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const healthKeys = { health: ['health'] as const, ios: ['health'] as const };

export function useHealth() {
  return useQuery({ queryKey: healthKeys.health, queryFn: () => api.get<any>('/health') });
}