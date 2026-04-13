import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Redirect, Stack, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function ViewLayout() {
  const params = useGlobalSearchParams<{ orgId?: string; id?: string }>();
  const { organisation, userRole, isLoadingAccess, hydrateFromOrgId } = useOrganisationContext();
  const colors = useThemeColors();
  const [hydrationAttempted, setHydrationAttempted] = useState(false);

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

  // Still loading
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

  // All roles (ADMIN, USER, VIEWER) can access /view — no role check needed
  // But if userRole is null (hydration failed for role), still allow since org loaded
  return <Stack screenOptions={{ headerShown: false }} />;
}
