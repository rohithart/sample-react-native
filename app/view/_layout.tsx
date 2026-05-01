import { useOrganisation } from '@/context/organisation-context';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Redirect, Stack, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

export default function ViewLayout() {
  const params = useGlobalSearchParams<{ orgId?: string; id?: string }>();
  const { organisation, isLoadingAccess, hydrateFromOrgId } = useOrganisation();
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

  useEffect(() => {
    if (isLoadingAccess || !hydrationAttempted) return;

    if (!organisation) {
      showToast({ type: 'error', title: 'Organisation not found', message: 'Could not load the organisation. You may not have access.' });
      setRedirectTo('/home');
    }
  }, [hydrationAttempted, isLoadingAccess, organisation, showToast]);

  if (redirectTo) {
    return <Redirect href={redirectTo as any} />;
  }

  if (isLoadingAccess || (!organisation && !hydrationAttempted)) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.sub, fontSize: 14 }}>Loading organisation...</Text>
      </View>
    );
  }

  if (!organisation) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
