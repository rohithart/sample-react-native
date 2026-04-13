import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { ListItemCard } from '@/components/ui/list-item-card';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateDummyList } from '@/utils/dummy-data';

export default function AnnouncementsListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [items] = useState(() => generateDummyList(12));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
          title="Announcements"
      />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItemCard
            title={item.name}
            description={item.description}
            status={item.status}
            onPress={() => router.push(`/view/announcement/${id}/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 12 }}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </SafeAreaView>
  );
}
