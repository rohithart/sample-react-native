import { Role } from '@/enums/user-role';
import { api } from '@/services/api-client';
import type { OrgAccess, Organisation, UserRole } from '@/types';
import React, { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type OrganisationContextType = {
  /** Currently selected organisation (null when on the org list). */
  organisation: Organisation | null;
  /** Module-access flags for the selected org (null until fetched). */
  orgAccess: OrgAccess | null;
  /** The full UserRole object (includes user, description, reference, etc.) */
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

  const selectOrganisation = useCallback(async (org: Organisation) => {
    setOrganisation(null);
    setOrgAccess(null);
    setUserRole(null);
    setIsLoadingAccess(true);
    try {
      const [organisation, access, roleData] = await Promise.all([
        api.get<Organisation>(`/api/organisation/${org._id}`),
        api.get<OrgAccess>(`/api/organisation/access/${org._id}`),
        api.get<UserRole>(`/api/user/role/${org._id}`),
      ]);
      setOrganisation(organisation);
      setOrgAccess(access);
      setUserRole(roleData);
    } catch (error) {
      console.error('[Organisation] Failed to select organisation:', error);
      setOrgAccess(null);
      setUserRole(null);
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
    if (organisation?._id === orgId) return;
    setOrgAccess(null);
    setUserRole(null);
    setIsLoadingAccess(true);
    try {
      const [org, access, roleData] = await Promise.all([
        api.get<Organisation>(`/api/organisation/${orgId}`),
        api.get<OrgAccess>(`/api/organisation/access/${orgId}`),
        api.get<UserRole>(`/api/user/role/${orgId}`),
      ]);
      setOrganisation(org);
      setOrgAccess(access);
      setUserRole(roleData);
    } catch (error) {
      console.error('[Organisation] Failed to hydrate from orgId:', error);
      setOrganisation(null);
      setOrgAccess(null);
      setUserRole(null);
    } finally {
      setIsLoadingAccess(false);
    }
  }, [organisation?._id]);

  const hasAccess = useCallback(
    (module: keyof OrgAccess) => {
      if (!orgAccess) return true;
      return !!orgAccess[module];
    },
    [orgAccess],
  );

  const canAccessAdmin = userRole?.role === Role.ADMIN || userRole?.role === Role.USER;
  const isAdmin = userRole?.role === Role.ADMIN;

  const value = useMemo(
    () => ({ organisation, orgAccess, userRole, isLoadingAccess, selectOrganisation, clearOrganisation, hasAccess, canAccessAdmin, isAdmin, hydrateFromOrgId }),
    [organisation, orgAccess, userRole, isLoadingAccess, selectOrganisation, clearOrganisation, hasAccess, canAccessAdmin, isAdmin, hydrateFromOrgId],
  );

  return <OrganisationContext.Provider value={value}>{children}</OrganisationContext.Provider>;
}

export function useOrganisation() {
  const context = useContext(OrganisationContext);
  if (!context) throw new Error('useOrganisation must be used within an OrganisationProvider');
  return context;
}
