import type { BookingType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const bookingTypeKeys = {
  all: (orgId: string) => ['bookingType', orgId] as const,
  detail: (id: string) => ['bookingType', 'detail', id] as const,
};

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------
const bookingTypeApi = {
  getAll: (orgId: string) => api.get<BookingType[]>(`/booking-type/org/${orgId}`),
  get: (id: string) => api.get<BookingType>(`/booking-type/${id}`),
  create: (orgId: string, data: Partial<BookingType>) => api.post<BookingType>(`/booking-type/${orgId}`, data),
  update: (id: string, data: Partial<BookingType>) => api.put<BookingType>(`/booking-type/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/booking-type/${id}`),
};

// ---------------------------------------------------------------------------
// Query hooks
// ---------------------------------------------------------------------------
export function useBookingTypes(orgId: string) {
  return useQuery({ queryKey: bookingTypeKeys.all(orgId), queryFn: () => bookingTypeApi.getAll(orgId), enabled: !!orgId });
}

export function useBookingType(id: string) {
  return useQuery({ queryKey: bookingTypeKeys.detail(id), queryFn: () => bookingTypeApi.get(id), enabled: !!id });
}

// ---------------------------------------------------------------------------
// Mutation hooks
// ---------------------------------------------------------------------------
export function useCreateBookingType(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<BookingType>) => bookingTypeApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: bookingTypeKeys.all(orgId) }) });
}

export function useUpdateBookingType(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<BookingType> }) => bookingTypeApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: bookingTypeKeys.all(orgId) }); qc.invalidateQueries({ queryKey: bookingTypeKeys.detail(id) }); } });
}

export function useDeleteBookingType(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => bookingTypeApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: bookingTypeKeys.all(orgId) }) });
}
