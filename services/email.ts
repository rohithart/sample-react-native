import type { EmailPayload } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { api } from './api-client';

const emailApi = {
  sendReport: (orgId: string, data: EmailPayload) => api.post<void>(`/api/admin-email/report/${orgId}`, data),
  sendReportComment: (id: string, data: EmailPayload) => api.post<void>(`/api/admin-email/report-comment/${id}`, data),
  sendReportWall: (id: string, data: EmailPayload) => api.post<void>(`/api/admin-email/report-wall/${id}`, data),
  sendContact: (orgId: string, data: EmailPayload) => api.post<void>(`/api/admin-email/contact-admin/${orgId}`, data),
  sendFeedback: (data: EmailPayload) => api.post<void>('/api/email/feedback', data),
};

export function useSendReport(orgId: string) {
  return useMutation({ mutationFn: (data: EmailPayload) => emailApi.sendReport(orgId, data) });
}

export function useSendFeedback() {
  return useMutation({ mutationFn: (data: EmailPayload) => emailApi.sendFeedback(data) });
}

export function useSendContact(orgId: string) {
  return useMutation({ mutationFn: (data: EmailPayload) => emailApi.sendContact(orgId, data) });
}
