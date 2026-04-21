import { useMutation } from '@tanstack/react-query';
import { api } from './api-client';

const emailApi = {
  sendReport: (orgId: string, data: any) => api.post<void>(`/api/admin-email/report/${orgId}`, data),
  sendReportComment: (id: string, data: any) => api.post<void>(`/api/admin-email/report-comment/${id}`, data),
  sendReportWall: (id: string, data: any) => api.post<void>(`/api/admin-email/report-wall/${id}`, data),
  sendContact: (orgId: string, data: any) => api.post<void>(`/api/admin-email/contact-admin/${orgId}`, data),
  sendFeedback: (data: any) => api.post<void>('/api/email/feedback', data),
};

export function useSendReport(orgId: string) {
  return useMutation({ mutationFn: (data: any) => emailApi.sendReport(orgId, data) });
}

export function useSendContact(orgId: string) {
  return useMutation({ mutationFn: (data: any) => emailApi.sendContact(orgId, data) });
}

export function useSendFeedback() {
  return useMutation({ mutationFn: (data: any) => emailApi.sendFeedback(data) });
}

export function useReportComment() {
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: any }) => emailApi.sendReportComment(id, data) });
}

export function useReportWall() {
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: any }) => emailApi.sendReportWall(id, data) });
}
