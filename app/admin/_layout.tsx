import { useOrganisationContext } from '@/context/organisation-context';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Redirect, Stack, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function AdminLayout() {
  const params = useGlobalSearchParams<{ orgId?: string; id?: string }>();
  const { organisation, isLoadingAccess, canAccessAdmin, hydrateFromOrgId } = useOrganisationContext();
  const { showToast } = useToast();
  const colors = useThemeColors();
  const [hydrationAttempted, setHydrationAttempted] = useState(!!organisation);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

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

  // Show toast + set redirect after hydration completes
  useEffect(() => {
    if (isLoadingAccess || !hydrationAttempted) return;

    if (!organisation) {
      showToast({ type: 'error', title: 'Organisation not found', message: 'Could not load the organisation. You may not have access.' });
      setRedirectTo('/home');
    } else if (!canAccessAdmin) {
      showToast({ type: 'warning', title: 'Access denied', message: 'You do not have admin access to this organisation.' });
      setRedirectTo(`/view/${organisation._id}`);
    }
  }, [hydrationAttempted, isLoadingAccess, organisation, canAccessAdmin, showToast]);

  // Redirect if needed
  if (redirectTo) {
    return <Redirect href={redirectTo as any} />;
  }

  // Still loading — show spinner
  if (isLoadingAccess || (!organisation && !hydrationAttempted)) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.sub, fontSize: 14 }}>Loading organisation...</Text>
      </View>
    );
  }

  // Waiting for redirect effect to fire
  if (!organisation || !canAccessAdmin) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
