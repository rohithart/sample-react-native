import { DisplaySettingsIndicator } from '@/components/display-settings';
import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { EntityCard } from '@/components/cards/entity-card';
import { PageHeader } from '@/components/ui/page-header';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useDisplaySettings } from '@/context/display-settings-context';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useArchivedVendors, useVendors } from '@/services/vendor';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const I = ENTITY_ICONS;

export default function VendorsListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();

  const { showArchived } = useDisplaySettings();
  const vendorsQuery = useVendors(id);
  const archivedVendorsQuery = useArchivedVendors(id);
  const items = showArchived ? archivedVendorsQuery.data ?? [] : vendorsQuery.data ?? [];
  const isLoading = showArchived ? archivedVendorsQuery.isLoading : vendorsQuery.isLoading;
  const refetching = showArchived ? archivedVendorsQuery.isRefetching : vendorsQuery.isRefetching;
  const refreshControl = useRefreshControl(
    showArchived ? archivedVendorsQuery.refetch : vendorsQuery.refetch,
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <Stack.Screen options={{ headerShown: false }} />
        <PageHeader
          icon="vendor"
          title="Vendors"
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
              config={ADMIN_CONFIGS.vendor}
              orgId={id}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={refreshControl}
          contentContainerStyle={{ paddingBottom: 12 }}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
              <Text style={{ color: colors.sub, fontSize: 15 }}>No vendors found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
