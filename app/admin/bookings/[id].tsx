import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { EntityCard } from '@/components/cards/entity-card';
import { PageHeader } from '@/components/ui/page-header';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useBookings } from '@/services/booking';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const I = ENTITY_ICONS;

export default function BookingsListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();

  const bookingsQuery = useBookings(id);
  const items = bookingsQuery.data ?? [];
  const isLoading = bookingsQuery.isLoading;
  const refetching = bookingsQuery.isRefetching;
  const refreshControl = useRefreshControl(
    bookingsQuery.refetch,
    refetching
  );

  const handleAdd = () => {
    router.push(`/admin/booking/new/${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="booking"
        title="Bookings"
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
              config={ADMIN_CONFIGS.booking}
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
