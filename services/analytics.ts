import type { AnalyticsData } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const analyticsKeys = {
  forYear: (orgId: string) => ['analytics', 'year', orgId] as const,
  forFY: (orgId: string) => ['analytics', 'fy', orgId] as const,
};

const analyticsApi = {
  getForYear: (orgId: string) => api.get<AnalyticsData>(`/analytics/current/${orgId}`),
  getForFinancialYear: (orgId: string) => api.get<AnalyticsData>(`/analytics/financial/${orgId}`),
  getForRange: (orgId: string, data: any) => api.patch<AnalyticsData>(`/analytics/range/${orgId}`, data),
  getFinancialStatement: (orgId: string, data: any) => api.patch<AnalyticsData>(`/analytics/income-expense/${orgId}`, data),
  getBalanceSheet: (orgId: string, data: any) => api.patch<AnalyticsData>(`/analytics/balance-sheet/${orgId}`, data),
};

export function useAnalyticsForYear(orgId: string) {
  return useQuery({ queryKey: analyticsKeys.forYear(orgId), queryFn: () => analyticsApi.getForYear(orgId), enabled: !!orgId });
}

export function useAnalyticsForFY(orgId: string) {
  return useQuery({ queryKey: analyticsKeys.forFY(orgId), queryFn: () => analyticsApi.getForFinancialYear(orgId), enabled: !!orgId });
}

export function useAnalyticsRange(orgId: string) {
  return useMutation({ mutationFn: (data: any) => analyticsApi.getForRange(orgId, data) });
}

export function useFinancialStatement(orgId: string) {
  return useMutation({ mutationFn: (data: any) => analyticsApi.getFinancialStatement(orgId, data) });
}

export function useBalanceSheet(orgId: string) {
  return useMutation({ mutationFn: (data: any) => analyticsApi.getBalanceSheet(orgId, data) });
}
