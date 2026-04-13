import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Redirect, Stack, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function AdminLayout() {
  const params = useGlobalSearchParams<{ orgId?: string; id?: string }>();
  const { organisation, isLoadingAccess, canAccessAdmin, hydrateFromOrgId } = useOrganisationContext();
  const colors = useThemeColors();
  const [hydrationAttempted, setHydrationAttempted] = useState(false);

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

  // Hydration failed or no orgId — redirect to home
  if (!organisation) {
    return <Redirect href="/" />;
  }

  // User is VIEWER only — no admin access, redirect to view
  if (!canAccessAdmin) {
    return <Redirect href={`/view/${organisation.id}` as any} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
