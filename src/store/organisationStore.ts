import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Organisation } from '@types/index';

interface OrganisationStore {
  selectedOrganisation: Organisation | null;
  organisations: Organisation[];
  setSelectedOrganisation: (org: Organisation | null) => void;
  setOrganisations: (orgs: Organisation[]) => void;
  addOrganisation: (org: Organisation) => void;
}

export const useOrganisationStore = create<OrganisationStore>()(
  persist(
    (set) => ({
      selectedOrganisation: null,
      organisations: [],
      setSelectedOrganisation: (selectedOrganisation) => set({ selectedOrganisation }),
      setOrganisations: (organisations) => set({ organisations }),
      addOrganisation: (org) =>
        set((state) => ({
          organisations: [...state.organisations, org],
        })),
    }),
    {
      name: 'organisation-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
