import type { StatusConfig } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const statusKeys = {
  workflow: (id: string) => ['statuses', 'workflow', id] as const,
  vendor: (id: string) => ['statuses', 'vendor', id] as const,
};

const statusApi = {
  getWorkflowStatuses: (id: string) => api.get<StatusConfig[]>(`/api/status/workflow/${id}`),
  getVendorStatuses: (id: string) => api.get<StatusConfig[]>(`/api/status/vendor/${id}`),
};

export function useWorkflowStatuses(id: string) {
  return useQuery({ queryKey: statusKeys.workflow(id), queryFn: () => statusApi.getWorkflowStatuses(id), enabled: !!id });
}

export function useVendorStatuses(id: string) {
  return useQuery({ queryKey: statusKeys.vendor(id), queryFn: () => statusApi.getVendorStatuses(id), enabled: !!id });
}
