import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { EntityCard } from '@/components/cards/entity-card';
import { VIEW_CONFIGS } from '@/components/cards/card-configs';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBookingsForUser } from '@/services/booking';
import { useRefreshControl } from '@/hooks/use-refresh-control';

export default function BookingsListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const { data: items, isLoading, refetch, isRefetching } = useBookingsForUser(id);
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="booking" title="Bookings" />

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
              config={VIEW_CONFIGS.booking}
              orgId={id}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={refreshControl}
          contentContainerStyle={{ paddingBottom: 12 }}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
              <Text style={{ color: colors.sub, fontSize: 15 }}>No bookings found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
