import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { EntityCard } from '@/components/cards/entity-card';
import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGroups } from '@/services/group';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { Pressable } from '@/components/ui/pressable';

const I = ENTITY_ICONS;

export default function GroupsListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { data: items, isLoading, refetch, isRefetching } = useGroups(id);
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleAdd = () => {
    router.push(`/admin/group/new/${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="group"
        title="Groups"
        rightAction={
          <Pressable
            onPress={handleAdd}
            style={{ padding: 8, backgroundColor: colors.primary, borderRadius: 8 }}
          >
            <I.plus size={20} color="#ffffff" />
          </Pressable>
        }
      />

      {isLoading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={items ?? []}
          renderItem={({ item }) => (
            <EntityCard
              item={item}
              config={ADMIN_CONFIGS.group}
              orgId={id}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={refreshControl}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={<EmptyState message="No groups found" />}
        />
      )}
    </SafeAreaView>
  );
}
