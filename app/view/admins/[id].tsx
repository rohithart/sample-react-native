import { AdminCard } from '@/components/cards/admin-card';
import { LoadingList } from '@/components/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/ui/page-header';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useGetAllAdmins } from '@/services/user';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <LoadingList />
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
