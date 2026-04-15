import type { DashboardData } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const dashboardKeys = {
  admin: (orgId: string) => ['dashboard', 'admin', orgId] as const,
  user: (orgId: string) => ['dashboard', 'user', orgId] as const,
};

const dashboardApi = {
  getAdmin: (orgId: string) => api.get<DashboardData>(`/api/dashboard/org/${orgId}`),
  getUser: (orgId: string) => api.get<DashboardData>(`/api/dashboard/user/${orgId}`),
};

export function useAdminDashboard(orgId: string) {
  return useQuery({ queryKey: dashboardKeys.admin(orgId), queryFn: () => dashboardApi.getAdmin(orgId), enabled: !!orgId });
}

export function useUserDashboard(orgId: string) {
  return useQuery({ queryKey: dashboardKeys.user(orgId), queryFn: () => dashboardApi.getUser(orgId), enabled: !!orgId });
}
