import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { EntityCard } from '@/components/cards/entity-card';
import { VIEW_CONFIGS } from '@/components/cards/card-configs';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInformations } from '@/services/information';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';

export default function InformationListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const { data: items, isLoading, refetch, isRefetching } = useInformations(id);
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="information" title="Information" />

      {isLoading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={items ?? []}
          renderItem={({ item }) => (
            <EntityCard
              item={item}
              config={VIEW_CONFIGS.information}
              orgId={id}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={refreshControl}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={<EmptyState message="No information found" />}
        />
      )}
    </SafeAreaView>
  );
}
