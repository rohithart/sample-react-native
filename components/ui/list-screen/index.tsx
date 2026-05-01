import { EntityCard, type EntityCardConfig } from '@/components/cards/entity-card';
import { DisplaySettingsIndicator } from '@/components/display-settings';
import { EmptyState } from '@/components/ui/empty-state';
import { LoadingList } from '@/components/skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { Pressable } from '@/components/ui/pressable';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useDisplaySettings } from '@/context/display-settings-context';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import type { UseQueryResult } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const I = ENTITY_ICONS;

interface ListScreenProps {
  icon: EntityIconKey;
  title: string;
  config: EntityCardConfig;
  useData: (id: string) => UseQueryResult<any[]>;
  useArchivedData?: (id: string) => UseQueryResult<any[]>;
  addRoute?: string;
  emptyMessage: string;
}

export function ListScreen({
  icon,
  title,
  config,
  useData,
  useArchivedData,
  addRoute,
  emptyMessage,
}: ListScreenProps) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();

  const hasArchive = !!useArchivedData;
  const displaySettings = hasArchive ? useDisplaySettings() : null;
  const showArchived = displaySettings?.showArchived ?? false;

  const primaryQuery = useData(id);
  const archivedQuery = useArchivedData?.(id);

  const items = showArchived ? archivedQuery?.data ?? [] : primaryQuery.data ?? [];
  const isLoading = showArchived ? archivedQuery?.isLoading ?? false : primaryQuery.isLoading;
  const refetching = showArchived ? archivedQuery?.isRefetching ?? false : primaryQuery.isRefetching;
  const refetchFn = showArchived ? archivedQuery?.refetch ?? primaryQuery.refetch : primaryQuery.refetch;
  const refreshControl = useRefreshControl(refetchFn, refetching);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
        icon={icon}
        title={title}
        rightAction={
          addRoute ? (
            <Pressable
              onPress={() => router.push(`${addRoute}/${id}` as any)}
              style={{ padding: 8, backgroundColor: colors.primary, borderRadius: 8 }}
            >
              <I.plus size={20} color="#ffffff" />
            </Pressable>
          ) : undefined
        }
      />

      {hasArchive && <DisplaySettingsIndicator />}

      {isLoading ? (
        <LoadingList />
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <EntityCard item={item} config={config} orgId={id} />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={refreshControl}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={<EmptyState message={emptyMessage} />}
        />
      )}
    </SafeAreaView>
  );
}
