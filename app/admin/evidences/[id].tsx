import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { EntityCard } from '@/components/cards/entity-card';
import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { DisplaySettingsIndicator } from '@/components/display-settings';
import { useDisplaySettings } from '@/context/display-settings-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useArchivedEvidences, useEvidences } from '@/services/evidence';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';

const I = ENTITY_ICONS;

export default function EvidencesListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { showArchived } = useDisplaySettings();
  const evidencesQuery = useEvidences(id);
  const archivedEvidencesQuery = useArchivedEvidences(id);
  const items = showArchived ? archivedEvidencesQuery.data ?? [] : evidencesQuery.data ?? [];
  const isLoading = showArchived ? archivedEvidencesQuery.isLoading : evidencesQuery.isLoading;
  const refetching = showArchived ? archivedEvidencesQuery.isRefetching : evidencesQuery.isRefetching;
  const refreshControl = useRefreshControl(
    showArchived ? archivedEvidencesQuery.refetch : evidencesQuery.refetch,
    refetching
  );

  const handleAdd = () => {
    router.push(`/admin/evidence/new/${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="evidence"
        title="Evidences"
        rightAction={
          <Pressable
            onPress={handleAdd}
            style={{ padding: 8, backgroundColor: colors.primary, borderRadius: 8 }}
          >
            <I.plus size={20} color="#ffffff" />
          </Pressable>
        }
      />

      <DisplaySettingsIndicator />

      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={items ?? []}
          renderItem={({ item }) => (
            <EntityCard
              item={item}
              config={ADMIN_CONFIGS.evidence}
              orgId={id}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={refreshControl}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
              <Text style={{ color: colors.sub, fontSize: 15 }}>No evidences found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
