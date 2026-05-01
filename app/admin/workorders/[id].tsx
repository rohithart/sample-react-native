import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { EntityCard } from '@/components/cards/entity-card';
import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { DisplaySettingsIndicator } from '@/components/display-settings';
import { useDisplaySettings } from '@/context/display-settings-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useArchivedWorkorders, useWorkorders } from '@/services/workorder';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { Pressable } from '@/components/ui/pressable';

const I = ENTITY_ICONS;

export default function WorkOrdersListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { showArchived } = useDisplaySettings();
  const workordersQuery = useWorkorders(id);
  const archivedWorkordersQuery = useArchivedWorkorders(id);
  const items = showArchived ? archivedWorkordersQuery.data ?? [] : workordersQuery.data ?? [];
  const isLoading = showArchived ? archivedWorkordersQuery.isLoading : workordersQuery.isLoading;
  const refetching = showArchived ? archivedWorkordersQuery.isRefetching : workordersQuery.isRefetching;
  const refreshControl = useRefreshControl(
    showArchived ? archivedWorkordersQuery.refetch : workordersQuery.refetch,
    refetching
  );

  const handleAdd = () => {
    router.push(`/admin/workorder/new/${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="workorder"
        title="Work Orders"
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
        <LoadingState />
      ) : (
        <FlatList
          data={items ?? []}
          renderItem={({ item }) => (
            <EntityCard
              item={item}
              config={ADMIN_CONFIGS.workorder}
              orgId={id}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={refreshControl}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={<EmptyState message="No work orders found" />}
        />
      )}
    </SafeAreaView>
  );
}
