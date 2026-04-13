import type { Organisation } from '@/types/organisation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const organisationKeys = {
  all: ['organisations'] as const,
  detail: (id: string) => ['organisations', id] as const,
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
// API functions — replace with real endpoints when ready
// ---------------------------------------------------------------------------
async function fetchOrganisations(): Promise<Organisation[]> {
  // TODO: replace with real API call, e.g.:
  // const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/organisations`);
  // if (!res.ok) throw new Error('Failed to fetch organisations');
  // return res.json();

  // Simulated network delay — remove when using a real API
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return SAMPLE_ORGANISATIONS;
}

async function createOrganisation(
  payload: Omit<Organisation, 'id' | 'createdAt' | 'memberCount'>
): Promise<Organisation> {
  // TODO: replace with real API call, e.g.:
  // const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/organisations`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error('Failed to create organisation');
  // return res.json();
  return {
    id: Date.now().toString(),
    memberCount: 1,
    createdAt: new Date().toISOString(),
    ...payload,
  };
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------
export function useOrganisations() {
  return useQuery({
    queryKey: organisationKeys.all,
    queryFn: fetchOrganisations,
  });
}

export function useCreateOrganisation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrganisation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organisationKeys.all });
    },
  });
}
