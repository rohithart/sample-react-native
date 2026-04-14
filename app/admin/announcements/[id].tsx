import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { ListItemCard } from '@/components/ui/list-item-card';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAnnouncements } from '@/services/announcement';
import { useRefreshControl } from '@/hooks/use-refresh-control';

export default function AnnouncementsListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { data: items, isLoading, refetch, isRefetching } = useAnnouncements(id);
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleAdd = () => {
    router.push(`/admin/announcement/new/${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
        title="Announcements"
        rightAction={
          <Pressable
            onPress={handleAdd}
            style={{ padding: 8, backgroundColor: colors.primary, borderRadius: 8 }}
          >
            <Plus size={20} color="#ffffff" />
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
            <ListItemCard
              title={item.name || item.title || 'Untitled'}
              description={item.description}
              status={item.status}
              onPress={() => router.push(`/admin/announcement/${id}/${item._id}`)}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={refreshControl}
          contentContainerStyle={{ paddingBottom: 12 }}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
              <Text style={{ color: colors.sub, fontSize: 15 }}>No announcements found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
