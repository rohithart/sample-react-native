import type { Booking } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const bookingKeys = {
  all: (orgId: string) => ['bookings', orgId] as const,
  forUser: (orgId: string) => ['bookings', orgId, 'user'] as const,
  forType: (typeId: string) => ['bookings', 'type', typeId] as const,
  detail: (id: string) => ['bookings', 'detail', id] as const,
};

const bookingApi = {
  getAll: (orgId: string) => api.get<Booking[]>(`/api/booking/org/${orgId}`),
  getAllForUser: (orgId: string) => api.get<Booking[]>(`/api/booking/user/${orgId}`),
  getForUser: (id: string) => api.get<Booking>(`/api/booking/view/${id}`),
  get: (id: string) => api.get<Booking>(`/api/booking/${id}`),
  getAllForBookingType: (typeId: string) => api.get<Booking[]>(`/api/booking/type/${typeId}`),
  create: (orgId: string, data: Partial<Booking>) => api.post<Booking>(`/api/booking/${orgId}`, data),
  update: (id: string, data: Partial<Booking>) => api.put<Booking>(`/api/booking/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/api/booking/${id}`),
  approve: (id: string) => api.patch<Booking>(`/api/booking/approve/${id}`, {}),
  reject: (id: string) => api.patch<Booking>(`/api/booking/reject/${id}`, {}),
};

export function useBookings(orgId: string) {
  return useQuery({ queryKey: bookingKeys.all(orgId), queryFn: () => bookingApi.getAll(orgId), enabled: !!orgId });
}

export function useBooking(id: string) {
  return useQuery({ queryKey: bookingKeys.detail(id), queryFn: () => bookingApi.get(id), enabled: !!id });
}

export function useCreateBooking(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Booking>) => bookingApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: bookingKeys.all(orgId) }) });
}

export function useUpdateBooking(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Booking> }) => bookingApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: bookingKeys.all(orgId) }); qc.invalidateQueries({ queryKey: bookingKeys.detail(id) }); } });
}

export function useDeleteBooking(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => bookingApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: bookingKeys.all(orgId) }) });
}

export function useApproveBooking(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => bookingApi.approve(id), onSuccess: () => qc.invalidateQueries({ queryKey: bookingKeys.all(orgId) }) });
}

export function useRejectBooking(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => bookingApi.reject(id), onSuccess: () => qc.invalidateQueries({ queryKey: bookingKeys.all(orgId) }) });
}
