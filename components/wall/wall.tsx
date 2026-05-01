import { WallCard } from '@/components/cards/wall-card';
import { HStack } from '@/components/ui/hstack';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useCreateWall, useWalls } from '@/services/wall';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { Pressable } from '@/components/ui/pressable';

export default function WallPage() {
  const { id: orgId } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const { data: walls, isLoading, refetch } = useWalls(orgId ?? '');
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
    return wall?.likedByUsers?.length ? wall?.likedByUsers?.length > 0 : false;
  }, [walls]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <HStack space="md" className='items-center' style={{ padding: 14, backgroundColor: colors.card, margin: 10, borderRadius: 12, marginBottom: 0 }}>
        <TextInput
          value={newPost}
          onChangeText={setNewPost}
          placeholder="What's on your mind?"
          placeholderTextColor={colors.sub}
          style={{ flex: 1, backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.inputBorder, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, color: colors.text, fontSize: 14, maxHeight: 100 }}
          multiline
          numberOfLines={5}
        />

        <Pressable
          onPress={handleAddPost}
          style={{ alignSelf: 'flex-end', backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 18, paddingVertical: 8 }}
          disabled={!newPost.trim() || createWall.isPending}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Post</Text>
        </Pressable>
      </HStack>

      {isLoading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={walls ?? []}
          renderItem={({ item }) => (
            <WallCard wall={item} orgId={orgId ?? ''} onRefresh={refetch} isLiked={isLiked} />
          )}
          keyExtractor={item => item._id}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={<EmptyState message="No posts yet" />}
        />
      )}
    </SafeAreaView>
  );
}
