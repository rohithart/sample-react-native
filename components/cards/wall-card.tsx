import { UserAvatar } from '@/components/user-avatar';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useOrganisation } from '@/context/organisation-context';
import { useToast } from '@/context/toast-context';
import { EntityType } from '@/enums';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useCreateComment, useDeleteComment } from '@/services/comment';
import { useReportWall } from '@/services/email';
import { useDeleteWall, useLikeWall } from '@/services/wall';
import { Wall } from '@/types';
import { convertToLocalDateTimeString } from '@/utils/date';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, TextInput, LayoutAnimation } from 'react-native';
import { CommentCard } from './comment-card';
import { HStack } from '../ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

const I = ENTITY_ICONS;

export function WallCard({ wall, orgId, onRefresh, isLiked }: { wall: Wall; orgId: string; onRefresh: () => void; isLiked: (id: string) => boolean }) {
  const colors = useThemeColors();
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [posting, setPosting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const { isAdmin } = useOrganisation();
  const { showToast } = useToast();

  const likeMutation = useLikeWall(orgId);
  const deleteMutation = useDeleteWall(orgId);
  const createComment = useCreateComment(orgId, EntityType.WALL, wall._id);
  const deleteCommentMutation = useDeleteComment(EntityType.WALL, wall._id);
  const reportMutation = useReportWall();

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

  const handleReport = useCallback((id: string, org: any) => {
      const data: any = {organisation: org}
      Alert.alert('Report Discussion', 'Are you sure you want to report this discussion?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Report', style: 'destructive', onPress: () => reportMutation.mutateAsync({ id, data }) },
      ]);
    }, [reportMutation]);

  const handleDeleteComment = (id: string) => {
    Alert.alert('Delete Comment', 'Are you sure you want to delete this comment?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteCommentMutation.mutate(id, { onSuccess: onRefresh }) },
    ]);
  };

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const handleLike = () => {
    if (likeMutation.isPending) return;
    likeMutation.mutate(wall._id, { onSuccess: onRefresh });
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    setPosting(true);
    createComment.mutate({
      comment: commentText.trim(),
      entityType: EntityType.WALL,
      entityId: wall._id,
      organisation: orgId as any,
    }, {
      onSuccess: () => {
        setCommentText('');
        setPosting(false);
        onRefresh();
      },
      onError: () => setPosting(false),
    });
  };

  return (
    <View style={{ 
      backgroundColor: colors.card, 
      borderRadius: 16, 
      marginVertical: 10, 
      marginHorizontal: 12, 
      padding: 16, 
      borderWidth: 1, 
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3 
    }}>
      {/* Header */}
      <HStack space="md" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <HStack space="sm" style={{ alignItems: 'center' }}>
          <UserAvatar userRole={wall.user} />
          <View>
            <Text style={{ color: colors.text, fontWeight: '700', fontSize: 14 }}>{wall.user?.user.email || 'User'}</Text>
            <Text style={{ color: colors.sub, fontSize: 11 }}>{convertToLocalDateTimeString(wall.createdAt)}</Text>
          </View>
        </HStack>
        
        <Pressable 
          onPress={() => handleReport(wall._id, wall.organisation)}
          style={{ padding: 6, opacity: 0.6 }}
        >
          <I.warning size={16} color={colors.sub} />
        </Pressable>
      </HStack>

      <Text style={{ color: colors.text, fontSize: 15, lineHeight: 22, marginBottom: 16 }}>
        {wall.message}
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border }}>
        <HStack space="md">
          <Pressable
            onPress={handleLike}
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              paddingVertical: 6, 
              paddingHorizontal: 12, 
              borderRadius: 20, 
              backgroundColor: isLiked(wall._id) ? colors.primary : colors.inputBg,
            }}
          >
            <I.vote size={14} color={isLiked(wall._id) ? '#fff' : colors.sub} />
            <Text style={{ color: isLiked(wall._id) ? '#fff' : colors.sub, marginLeft: 6, fontSize: 13, fontWeight: '600' }}>
              {wall.likedByUsers?.length || 0}
            </Text>
          </Pressable>

          <Pressable
            onPress={toggleAccordion}
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              paddingVertical: 6, 
              paddingHorizontal: 12, 
              borderRadius: 20, 
              backgroundColor: colors.inputBg 
            }}
          >
            <I.comment size={14} color={colors.sub} />
            <Text style={{ color: colors.sub, marginLeft: 6, fontSize: 13, fontWeight: '600' }}>
              {wall.comments?.length || 0}
            </Text>
          </Pressable>
        </HStack>

        {isAdmin && (
          <Pressable onPress={handleDelete} style={{ padding: 6 }}>
            <I.trash size={16} color={colors.danger} />
          </Pressable>
        )}
      </View>

      {isExpanded && (
        <View style={{ marginTop: 12 }}>
          <FlatList
            data={wall.comments ?? []}
            renderItem={({ item }) => <CommentCard item={item} handleDelete={handleDeleteComment} />}
            keyExtractor={item => item._id}
            scrollEnabled={false}
            ListEmptyComponent={
              <Text style={{ color: colors.sub, fontSize: 12, textAlign: 'center', marginVertical: 10 }}>
                Be the first to comment
              </Text>
            }
          />
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 8 }}>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment..."
              placeholderTextColor={colors.sub}
              style={{ 
                flex: 1, 
                backgroundColor: colors.bg, 
                borderRadius: 20, 
                paddingHorizontal: 16, 
                paddingVertical: 8, 
                color: colors.text, 
                fontSize: 14, 
                borderWidth: 1, 
                borderColor: colors.border 
              }}
              editable={!posting}
            />
            <Pressable
              onPress={handleAddComment}
              disabled={!commentText.trim() || posting}
              style={{ 
                backgroundColor: colors.primary, 
                width: 36, 
                height: 36, 
                borderRadius: 18, 
                justifyContent: 'center', 
                alignItems: 'center',
                opacity: !commentText.trim() ? 0.5 : 1
              }}
            >
              {posting ? <ActivityIndicator size="small" color="#fff" /> : <I.send size={16} color="#fff" />}
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
