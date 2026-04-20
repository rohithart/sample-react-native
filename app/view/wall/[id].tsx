import { WallCard } from '@/components/cards/wall-card';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useCreateWall, useWalls } from '@/services/wall';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WallScreen() {
  const { id: orgId } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const router = useRouter();
  const { data: walls, isLoading, refetch, isRefetching } = useWalls(orgId ?? '');
  const createWall = useCreateWall(orgId ?? '');
  const { showToast } = useToast();
  const [newPost, setNewPost] = useState('');

  const handleAddPost = useCallback(() => {
    if (!newPost.trim()) return;
    createWall.mutate({ message: newPost.trim() }, {
      onSuccess: () => {
        setNewPost('');
        showToast({ type: 'success', title: 'Posted!' });
      },
    });
  }, [newPost, createWall, showToast]);

  const isLiked = useCallback((id: string) => {
    const wall = walls?.find((w) => w._id === id);
    return wall?.likedByUsers?.length > 0;
  }, [walls]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: colors.border, backgroundColor: colors.card }}>
        <Pressable onPress={() => router.back()} style={{ padding: 4, marginRight: 12 }}>
          <Text style={{ fontSize: 24, color: colors.text }}>‹</Text>
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>Wall</Text>
      </View>

      <View style={{ padding: 14, backgroundColor: colors.card, margin: 10, borderRadius: 12, marginBottom: 0 }}>
        <TextInput
          value={newPost}
          onChangeText={setNewPost}
          placeholder="What's on your mind?"
          placeholderTextColor={colors.sub}
          style={{ backgroundColor: colors.bg, borderRadius: 8, padding: 10, color: colors.text, fontSize: 15, borderWidth: 1, borderColor: colors.border, marginBottom: 8 }}
          multiline
          numberOfLines={3}
        />
        <Pressable
          onPress={handleAddPost}
          style={{ alignSelf: 'flex-end', backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 18, paddingVertical: 8 }}
          disabled={!newPost.trim() || createWall.isPending}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Post</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={walls ?? []}
          renderItem={({ item }) => (
            <WallCard wall={item} orgId={orgId ?? ''} onRefresh={refetch} isLiked={isLiked} />
          )}
          keyExtractor={item => item._id}
          contentContainerStyle={{ paddingBottom: 24 }}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
              <Text style={{ color: colors.sub, fontSize: 15 }}>No posts yet</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
