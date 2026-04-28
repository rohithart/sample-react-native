import { AdminCard } from '@/components/cards/admin-card';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useGetAllAdmins } from '@/services/user';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminsListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const router = useRouter();
  const { data: admins, isLoading } = useGetAllAdmins(id || '')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: colors.border, backgroundColor: colors.card }}>
        <Pressable onPress={() => router.back()} style={{ padding: 4, marginRight: 12 }}>
          <Text style={{ fontSize: 24, color: colors.text }}>‹</Text>
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>Admins</Text>
      </View>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={Array.isArray(admins) ? admins : []}
          renderItem={({ item }) => <AdminCard admin={item} />}
          keyExtractor={item => item._id}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
              <Text style={{ color: colors.sub, fontSize: 15 }}>No admins found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
