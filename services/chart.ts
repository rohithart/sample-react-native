import type { ChartData } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const chartKeys = {
  admin: (orgId: string) => ['chart', 'admin', orgId] as const,
  user: (orgId: string) => ['chart', 'user', orgId] as const,
};

const chartApi = {
  getAdmin: (orgId: string) => api.get<ChartData>(`/api/chart/org/${orgId}`),
  getUser: (orgId: string) => api.get<ChartData>(`/api/chart/user/${orgId}`),
};

export function useAdminChart(orgId: string) {
  return useQuery({ queryKey: chartKeys.admin(orgId), queryFn: () => chartApi.getAdmin(orgId), enabled: !!orgId });
}

export function useUserChart(orgId: string) {
  return useQuery({ queryKey: chartKeys.user(orgId), queryFn: () => chartApi.getUser(orgId), enabled: !!orgId });
}
