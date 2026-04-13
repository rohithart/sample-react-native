import type { Alert } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const alertKeys = { all: ['alerts'] as const };

export function useAlerts() {
  return useQuery({ queryKey: alertKeys.all, queryFn: () => api.get<Alert[]>('/alert/web') });
}
