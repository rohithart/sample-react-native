import { UserAvatar } from '@/components/user-avatar';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useOrganisationContext } from '@/context/organisation-context';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useCreateComment, useDeleteComment } from '@/services/comment';
import { useDeleteWall, useLikeWall } from '@/services/wall';
import { Comment, Wall } from '@/types';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';

const I = ENTITY_ICONS;

export function WallCard({ wall, orgId, onRefresh, isLiked }: { wall: any; orgId: string; onRefresh: () => void; isLiked: (id: string) => boolean }) {
  const colors = useThemeColors();
  const likeMutation = useLikeWall(orgId);
  const deleteMutation = useDeleteWall(orgId);
  const createComment = useCreateComment(orgId, 'wall', wall._id);
  const deleteCommentMutation = useDeleteComment('wall', wall._id);
  const { showToast } = useToast();
  const [deleting, setDeleting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [posting, setPosting] = useState(false);
  const { isAdmin } = useOrganisationContext();

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

  const handleDeleteComment = (id: string) => {
      Alert.alert('Delete Comment', 'Are you sure you want to delete this comment?', [
        { text: 'Delete', style: 'destructive', onPress: () => deleteCommentMutation.mutate(id) },
      ]);
    }, [deleteCommentMutation];

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    setPosting(true);
    createComment.mutate({
      comment: commentText.trim(),
      entityType: 'wall',
      entityId: wall._id,
      organisation: orgId,
    }, {
      onSuccess: () => {
        setCommentText('');
        setPosting(false);
        onRefresh();
      },
      onError: () => setPosting(false),
    });
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
      <UserAvatar userRole={item.user} />
      <View style={{ marginLeft: 8, flex: 1, backgroundColor: colors.bg, borderRadius: 8, padding: 8, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontSize: 13 }}>{item.comment}</Text>
          <Text style={{ color: colors.sub, fontSize: 11, marginTop: 2 }}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
        {isAdmin && (
        <Pressable onPress={() => handleDeleteComment(item._id)} style={{ padding: 4 }} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? <ActivityIndicator size="small" color={colors.danger} /> : <I.trash size={14} color={colors.danger} />}
        </Pressable>
        )}
      </View>
    </View>
  );

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

      {/* Comments Section */}
      <View style={{ marginTop: 16, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10 }}>
        <Text style={{ fontWeight: '700', color: colors.sub, marginBottom: 6, fontSize: 13 }}>
          Comments ({wall.comments?.length || 0})
        </Text>
        <FlatList
          data={wall.comments ?? []}
          renderItem={renderComment}
          keyExtractor={item => item._id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 2 }}
          ListEmptyComponent={<Text style={{ color: colors.sub, fontSize: 13 }}>No comments yet</Text>}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Write a comment..."
            placeholderTextColor={colors.sub}
            style={{ flex: 1, backgroundColor: colors.bg, borderRadius: 8, padding: 8, color: colors.text, fontSize: 14, borderWidth: 1, borderColor: colors.border, marginRight: 8 }}
            editable={!posting}
            onSubmitEditing={handleAddComment}
            returnKeyType="send"
          />
          <Pressable
            onPress={handleAddComment}
            style={{ backgroundColor: colors.primary, borderRadius: 8, padding: 10 }}
            disabled={!commentText.trim() || posting}
          >
            <I.plus size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
