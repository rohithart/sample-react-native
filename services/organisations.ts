import type { Organisation } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const organisationKeys = {
  all: ['organisations'] as const,
  detail: (id: string) => ['organisations', id] as const,
  access: (id: string) => ['organisations', 'access', id] as const,
};

const organisationApi = {
  getAll: async (): Promise<Organisation[]> => {
    return api.get<Organisation[]>('/api/organisation');
  },
  get: (id: string) => api.get<Organisation>(`/api/organisation/${id}`),
  getAccess: (id: string) => api.get<any>(`/api/organisation/access/${id}`),
  create: (data: Partial<Organisation>) => api.post<any>('/api/organisation', data),
  update: (id: string, data: Partial<Organisation>) => api.put<Organisation>(`/api/organisation/${id}`, data),
  startOnboarding: (id: string) => api.patch<Organisation>(`/api/organisation/start-onboarding/${id}`, {}),
  stopOnboarding: (id: string) => api.patch<Organisation>(`/api/organisation/stop-onboarding/${id}`, {}),
};

export function useOrganisations() {
  return useQuery({
    queryKey: organisationKeys.all,
    queryFn: organisationApi.getAll,
  });
}

export function useOrganisation(id: string) {
  return useQuery({
    queryKey: organisationKeys.detail(id),
    queryFn: () => organisationApi.get(id),
    enabled: !!id,
  });
}

export function useCreateOrganisation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Organisation>) => organisationApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: organisationKeys.all }),
  });
}

export function useUpdateOrganisation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Organisation> }) => organisationApi.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: organisationKeys.all });
      qc.invalidateQueries({ queryKey: organisationKeys.detail(id) });
    },
  });
}
