import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { EntityCard } from '@/components/cards/entity-card';
import { VIEW_CONFIGS } from '@/components/cards/card-configs';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserRequests } from '@/services/user-request';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { Pressable } from '@/components/ui/pressable';

const I = ENTITY_ICONS;

export default function MyRequestsListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { data: items, isLoading, refetch, isRefetching } = useUserRequests(id);
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleAdd = () => {
    router.push(`/view/user-request/new/${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="userRequest" title="Your Requests" 
      rightAction={
        <Pressable
          onPress={handleAdd}
          style={{ padding: 8, backgroundColor: colors.primary, borderRadius: 8 }}
        >
          <I.plus size={20} color="#ffffff" />
        </Pressable>
      }/>

      {isLoading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={items ?? []}
          renderItem={({ item }) => (
            <EntityCard
              item={item}
              config={VIEW_CONFIGS.userRequest}
              orgId={id}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={refreshControl}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={<EmptyState message="No user requests found" />}
        />
      )}
    </SafeAreaView>
  );
}
