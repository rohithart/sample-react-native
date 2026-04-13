import type { Organisation } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const organisationKeys = {
  all: ['organisations'] as const,
  detail: (id: string) => ['organisations', id] as const,
  access: (id: string) => ['organisations', 'access', id] as const,
};

// ---------------------------------------------------------------------------
// Sample data — remove when real API is wired up
// ---------------------------------------------------------------------------
const SAMPLE_ORGANISATIONS: Organisation[] = [
  {
    id: '1',
    name: 'Rebel Alliance',
    description: 'Fighting for freedom and justice across the galaxy.',
    memberCount: 4200,
    createdAt: '2024-01-15T08:00:00.000Z',
  },
  {
    id: '2',
    name: 'Galactic Empire',
    description: 'Maintaining order through strength and discipline.',
    memberCount: 1200000,
    createdAt: '2024-02-20T10:30:00.000Z',
  },
  {
    id: '3',
    name: 'Jedi Order',
    description: 'Guardians of peace and justice, keepers of the Force.',
    memberCount: 10000,
    createdAt: '2024-03-05T14:00:00.000Z',
  },
  {
    id: '4',
    name: 'Mandalorian Clan',
    description: 'This is the way. A brotherhood bound by honour and creed.',
    memberCount: 350,
    createdAt: '2024-04-11T09:15:00.000Z',
  },
  {
    id: '5',
    name: 'Hutt Cartel',
    description: 'Controlling trade routes and black markets across the Outer Rim.',
    memberCount: 8700,
    createdAt: '2024-05-01T12:00:00.000Z',
  },
];

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------
const organisationApi = {
  getAll: async (): Promise<Organisation[]> => {
    // TODO: uncomment when real API is ready
    // return api.get<Organisation[]>('/organisation');

    // Dummy data with simulated delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return SAMPLE_ORGANISATIONS;
  },
  get: (id: string) => api.get<Organisation>(`/organisation/${id}`),
  getAccess: (id: string) => api.get<any>(`/organisation/access/${id}`),
  create: (data: Partial<Organisation>) => api.post<any>('/organisation', data),
  update: (id: string, data: Partial<Organisation>) => api.put<Organisation>(`/organisation/${id}`, data),
  startOnboarding: (id: string) => api.patch<Organisation>(`/organisation/start-onboarding/${id}`, {}),
  stopOnboarding: (id: string) => api.patch<Organisation>(`/organisation/stop-onboarding/${id}`, {}),
};

// ---------------------------------------------------------------------------
// Query hooks
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Mutation hooks
// ---------------------------------------------------------------------------
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
