import { UserAvatar } from '@/components/user-avatar';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useDeleteWall, useLikeWall } from '@/services/wall';
import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

const I = ENTITY_ICONS;

export function WallCard({ wall, orgId, onRefresh, isLiked }: { wall: any; orgId: string; onRefresh: () => void; isLiked: (id: string) => boolean }) {
  const colors = useThemeColors();
  const likeMutation = useLikeWall(orgId);
  const deleteMutation = useDeleteWall(orgId);
  const { showToast } = useToast();
  const [deleting, setDeleting] = useState(false);

  const handleLike = () => {
    if (likeMutation.isPending) return;
    likeMutation.mutate(wall._id, { onSuccess: onRefresh });
  };

  const handleDelete = () => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        setDeleting(true);
        deleteMutation.mutate(wall._id, {
          onSuccess: () => {
            setDeleting(false);
            showToast({ type: 'success', title: 'Post deleted' });
            onRefresh();
          },
          onError: () => setDeleting(false),
        });
      } },
    ]);
  };

  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 14, marginVertical: 8, marginHorizontal: 8, padding: 14, shadowColor: colors.text, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'space-between' }}>
        <UserAvatar userRole={wall.user} />
        <Text style={{ color: colors.sub, fontSize: 12 }}>{new Date(wall.createdAt).toLocaleString()}</Text>
      </View>
      <Text style={{ color: colors.text, fontSize: 15, marginBottom: 10 }}>{wall.message}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Pressable
          onPress={handleLike}
          style={{ flexDirection: 'row', alignItems: 'center', padding: 6, borderRadius: 8, backgroundColor: isLiked(wall._id) ? colors.primary + '22' : colors.bg, borderWidth: 1, borderColor: isLiked(wall._id) ? colors.primary : colors.border, marginRight: 10 }}
        >
          <I.vote size={18} color={isLiked(wall._id) ? colors.primary : colors.sub} />
          <Text style={{ color: isLiked(wall._id) ? colors.primary : colors.sub, marginLeft: 6, fontWeight: '600' }}>{wall.likedByUsers?.length || 0}</Text>
        </Pressable>
        <Pressable
          onPress={handleDelete}
          style={{ padding: 6, borderRadius: 8, backgroundColor: colors.dangerBg, borderWidth: 1, borderColor: colors.danger }}
          disabled={deleting || deleteMutation.isPending}
        >
          <I.trash size={18} color={colors.danger} />
        </Pressable>
      </View>
    </View>
  );
}
