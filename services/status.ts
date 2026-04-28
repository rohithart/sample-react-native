import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const statusKeys = {
  workflow: (id: string) => ['statuses', 'workflow', id] as const,
  vendor: (id: string) => ['statuses', 'vendor', id] as const,
  adminHelp: (id: string) => ['statuses', 'adminHelp', id] as const,
  userHelp: (id: string) => ['statuses', 'userHelp', id] as const,
};

const statusApi = {
  getWorkflowStatuses: (id: string) => api.get<any[]>(`/api/status/workflow/${id}`),
  getVendorStatuses: (id: string) => api.get<any[]>(`/api/status/vendor/${id}`),
  getAdminHelp: (id: string) => api.get<any>(`/api/status/help/admin/${id}`),
  getUserHelp: (id: string) => api.get<any>(`/api/status/help/user/${id}`),
};

export function useWorkflowStatuses(id: string) {
  return useQuery({ queryKey: statusKeys.workflow(id), queryFn: () => statusApi.getWorkflowStatuses(id), enabled: !!id });
}

export function useVendorStatuses(id: string) {
  return useQuery({ queryKey: statusKeys.vendor(id), queryFn: () => statusApi.getVendorStatuses(id), enabled: !!id });
}

export function useAdminHelp(id: string) {
  return useQuery({ queryKey: statusKeys.adminHelp(id), queryFn: () => statusApi.getAdminHelp(id), enabled: !!id });
}

export function useUserHelp(id: string) {
  return useQuery({ queryKey: statusKeys.userHelp(id), queryFn: () => statusApi.getUserHelp(id), enabled: !!id });
}