import { useOrganisationContext } from '@/context/organisation-context';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Redirect, Stack, useGlobalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function AdminLayout() {
  const params = useGlobalSearchParams<{ orgId?: string; id?: string }>();
  const { organisation, isLoadingAccess, canAccessAdmin, hydrateFromOrgId } = useOrganisationContext();
  const { showToast } = useToast();
  const colors = useThemeColors();
  const router = useRouter();
  const [hydrationAttempted, setHydrationAttempted] = useState(false);
  const toastShown = useRef(false);

  // orgId can come from [orgId] param (detail/edit pages) or [id] param (list/new pages)
  const orgId = params.orgId || params.id;

  useEffect(() => {
    // Already loaded — nothing to do
    if (organisation) return;

    // Have an orgId from the URL — hydrate the context
    if (orgId && !isLoadingAccess && !hydrationAttempted) {
      hydrateFromOrgId(orgId).finally(() => setHydrationAttempted(true));
      return;
    }

    // No orgId in URL — mark hydration as attempted so we redirect
    if (!orgId && !hydrationAttempted) {
      setHydrationAttempted(true);
    }
  }, [organisation, orgId, isLoadingAccess, hydrationAttempted, hydrateFromOrgId]);

  // Still loading — show spinner
  if (isLoadingAccess || (!organisation && !hydrationAttempted)) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.sub, fontSize: 14 }}>Loading organisation...</Text>
      </View>
    );
  }

  // Hydration failed or no orgId — show toast and redirect to org list
  if (!organisation) {
    if (!toastShown.current) {
      toastShown.current = true;
      showToast({ type: 'error', title: 'Organisation not found', message: 'Could not load the organisation. You may not have access.' });
    }
    return <Redirect href="/" />;
  }

  // User is VIEWER only — no admin access, redirect to view
  if (!canAccessAdmin) {
    if (!toastShown.current) {
      toastShown.current = true;
      showToast({ type: 'warning', title: 'Access denied', message: 'You do not have admin access to this organisation.' });
    }
    return <Redirect href={`/view/${organisation.id}` as any} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
