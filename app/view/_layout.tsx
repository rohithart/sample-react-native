import { useOrganisationContext } from '@/context/organisation-context';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Redirect, Stack, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function ViewLayout() {
  const params = useGlobalSearchParams<{ orgId?: string; id?: string }>();
  const { organisation, isLoadingAccess, hydrateFromOrgId } = useOrganisationContext();
  const { showToast } = useToast();
  const colors = useThemeColors();
  const [hydrationAttempted, setHydrationAttempted] = useState(!!organisation);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const orgId = params.orgId || params.id;

  useEffect(() => {
    if (organisation) return;

    if (orgId && !isLoadingAccess && !hydrationAttempted) {
      hydrateFromOrgId(orgId).finally(() => setHydrationAttempted(true));
      return;
    }

    if (!orgId && !hydrationAttempted) {
      setHydrationAttempted(true);
    }
  }, [organisation, orgId, isLoadingAccess, hydrationAttempted, hydrateFromOrgId]);

  // Show toast + set redirect after hydration completes
  useEffect(() => {
    if (isLoadingAccess || !hydrationAttempted) return;

    if (!organisation) {
      showToast({ type: 'error', title: 'Organisation not found', message: 'Could not load the organisation. You may not have access.' });
      setRedirectTo('/');
    }
  }, [hydrationAttempted, isLoadingAccess, organisation, showToast]);

  // Redirect if needed
  if (redirectTo) {
    return <Redirect href={redirectTo as any} />;
  }

  // Still loading
  if (isLoadingAccess || (!organisation && !hydrationAttempted)) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.sub, fontSize: 14 }}>Loading organisation...</Text>
      </View>
    );
  }

  // Waiting for redirect effect to fire
  if (!organisation) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // All roles (ADMIN, USER, VIEWER) can access /view
  return <Stack screenOptions={{ headerShown: false }} />;
}
