import { AdminCard } from '@/components/cards/admin-card';
import { PageHeader } from '@/components/ui/page-header';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useGetAllAdmins } from '@/services/user';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';

export default function AdminsListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const { data: admins, isLoading } = useGetAllAdmins(id || '')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="user"
        title="Your Admins"
      />
      {isLoading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={Array.isArray(admins) ? admins : []}
          renderItem={({ item }) => <AdminCard admin={item} />}
          keyExtractor={item => item._id}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={<EmptyState message="No admins found" />}
        />
      )}
    </SafeAreaView>
  );
}
