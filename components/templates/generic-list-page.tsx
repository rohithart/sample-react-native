import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ListPageProps {
  title: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  onAddPress: () => void;
}

export function GenericListPage({
  title,
  items,
  renderItem,
  onAddPress,
}: ListPageProps) {
  const { bg, card, text, sub, border, primary } = useThemeColors();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          borderBottomWidth: 1,
          borderColor: border,
          backgroundColor: card,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => router.back()} style={{ padding: 4 }}>
            <Text style={{ fontSize: 24, color: text }}>‹</Text>
          </Pressable>
          <Text style={{ fontSize: 18, fontWeight: '700', color: text }}>
            {title}
          </Text>
        </View>
        <Pressable
          onPress={onAddPress}
          style={{
            padding: 8,
            backgroundColor: primary,
            borderRadius: 8,
          }}
        >
          <Plus size={20} color="#ffffff" />
        </Pressable>
      </View>

      {/* List */}
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 12, gap: 8 }}
          scrollIndicatorInsets={{ right: 1 }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Text style={{ fontSize: 48 }}>📭</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: text }}>
            No items yet
          </Text>
          <Text style={{ fontSize: 14, color: sub }}>
            Tap the + button to add your first item
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
