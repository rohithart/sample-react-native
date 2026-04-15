import type { Alert } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const alertKeys = { android: ['alerts'] as const, ios: ['alerts'] as const };

export function useAlertsAndroid() {
  return useQuery({ queryKey: alertKeys.android, queryFn: () => api.get<Alert[]>('/alert/android') });
}

export function useAlertsiOS() {
  return useQuery({ queryKey: alertKeys.ios, queryFn: () => api.get<Alert[]>('/alert/ios') });
}