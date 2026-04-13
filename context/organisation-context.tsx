import { api } from '@/services/api-client';
import type { OrgAccess, Organisation } from '@/types';
import React, { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type UserRole = 'ADMIN' | 'USER' | 'VIEWER';

type OrganisationContextType = {
  /** Currently selected organisation (null when on the org list). */
  organisation: Organisation | null;
  /** Module-access flags for the selected org (null until fetched). */
  orgAccess: OrgAccess | null;
  /** The current user's role within the selected org. */
  userRole: UserRole | null;
  /** Whether we're currently fetching the org access / role. */
  isLoadingAccess: boolean;
  /** Select an org — stores it and fetches its access data + user role. */
  selectOrganisation: (org: Organisation) => Promise<void>;
  /** Clear selection — call when navigating back to the org list. */
  clearOrganisation: () => void;
  /** Helper: returns true if the selected org has access to a given module. */
  hasAccess: (module: keyof OrgAccess) => boolean;
  /** Helper: returns true if the user can access /admin routes (ADMIN or USER). */
  canAccessAdmin: boolean;
  /** Helper: returns true if the user is an ADMIN. Use to hide admin-only UI. */
  isAdmin: boolean;
  /** Hydrate context from an orgId (for deep links). Fetches org + access + role. */
  hydrateFromOrgId: (orgId: string) => Promise<void>;
};

const OrganisationContext = createContext<OrganisationContextType | undefined>(undefined);

export function OrganisationProvider({ children }: { children: ReactNode }) {
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  const [orgAccess, setOrgAccess] = useState<OrgAccess | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoadingAccess, setIsLoadingAccess] = useState(false);

  const selectOrganisation = useCallback(async (id: string) => {
    setOrganisation(null);
    setOrgAccess(null);
    setUserRole(null);
    setIsLoadingAccess(true);
    try {
      const [org, access, roleData] = await Promise.all([
        api.get<Organisation>(`/organisation/${id}`),
        api.get<OrgAccess>(`/organisation/access/${id}`),
        api.get<{ role: string }>(`/user/role/${id}`),
      ]);
      setOrganisation(org);
      setOrgAccess(access);
      setUserRole((roleData.role as UserRole) ?? 'VIEWER');
    } catch {
      // If calls fail, default to safe fallbacks
      setOrgAccess(null);
      setUserRole('VIEWER');
    } finally {
      setIsLoadingAccess(false);
    }
  }, []);

  const clearOrganisation = useCallback(() => {
    setOrganisation(null);
    setOrgAccess(null);
    setUserRole(null);
  }, []);

  const hydrateFromOrgId = useCallback(async (orgId: string) => {
    // Skip if already loaded for this org
    if (organisation?._id === orgId) return;
    setOrgAccess(null);
    setUserRole(null);
    setIsLoadingAccess(true);
    try {
      const [org, access, roleData] = await Promise.all([
        api.get<Organisation>(`/organisation/${orgId}`),
        api.get<OrgAccess>(`/organisation/access/${orgId}`),
        api.get<{ role: string }>(`/user/role/${orgId}`),
      ]);
      setOrganisation(org);
      setOrgAccess(access);
      setUserRole((roleData.role as UserRole) ?? 'VIEWER');
    } catch {
      setOrganisation(null);
      setOrgAccess(null);
      setUserRole(null);
    } finally {
      setIsLoadingAccess(false);
    }
  }, [organisation?._id]);

  const hasAccess = useCallback(
    (module: keyof OrgAccess) => {
      // If access hasn't loaded yet or failed, allow access by default
      if (!orgAccess) return true;
      return !!orgAccess[module];
    },
    [orgAccess],
  );

  const canAccessAdmin = userRole === 'ADMIN' || userRole === 'USER';
  const isAdmin = userRole === 'ADMIN';

  const value = useMemo(
    () => ({ organisation, orgAccess, userRole, isLoadingAccess, selectOrganisation, clearOrganisation, hasAccess, canAccessAdmin, isAdmin, hydrateFromOrgId }),
    [organisation, orgAccess, userRole, isLoadingAccess, selectOrganisation, clearOrganisation, hasAccess, canAccessAdmin, isAdmin, hydrateFromOrgId],
  );

  return <OrganisationContext.Provider value={value}>{children}</OrganisationContext.Provider>;
}

export function useOrganisationContext() {
  const context = useContext(OrganisationContext);
  if (!context) throw new Error('useOrganisationContext must be used within an OrganisationProvider');
  return context;
}
