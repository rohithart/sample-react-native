import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useComments, useCreateComment, useDeleteComment } from '@/services/comment';
import type { Comment } from '@/types';

import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';

const I = ENTITY_ICONS;

type CommentEntity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'vendor' | 'document' | 'asset' | 'booking' | 'request' | 'meeting' | 'transaction' | 'financial-year';

interface EntityCommentsProps {
  isVisible: boolean;
  onClose: () => void;
  entity: CommentEntity;
  entityId: string;
  orgId: string;
}

function fmtTime(d: string) {
  const date = new Date(d);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getInitials(name?: string): string {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export function EntityComments({ isVisible, onClose, entity, entityId, orgId }: EntityCommentsProps) {
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();
  const { isAdmin } = useOrganisationContext();
  const { data: comments, isLoading } = useComments(entity, entityId);
  const createMutation = useCreateComment(orgId, entity, entityId);
  const deleteMutation = useDeleteComment(entity, entityId);
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (!content.trim()) return;
    createMutation.mutate({ comment: content.trim(), entityType: entity, entityId } as any, {
      onSuccess: () => setContent(''),
    });
  };

  const handleDelete = useCallback((id: string) => {
    Alert.alert('Delete Comment', 'Are you sure you want to delete this comment?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate(id) },
    ]);
  }, [deleteMutation]);

  const renderItem = ({ item }: { item: Comment }) => {
    const userName = (item as any).user?.name || (item as any).user?.user?.name;
    const commentText = (item as any).comment || (item as any).content || '';

    return (
      <HStack space="sm" className="items-start">
        <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primary + '20', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary }}>{getInitials(userName)}</Text>
        </View>

        <VStack space="xs" className="flex-1" style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 12, borderTopLeftRadius: 4, padding: 10 }}>
          <HStack className="justify-between items-center">
            <HStack space="sm" className="items-center flex-1">
              {userName && <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>{userName}</Text>}
              <Text style={{ fontSize: 11, color: colors.sub }}>{fmtTime(item.createdAt)}</Text>
            </HStack>
            {isAdmin && (
              <Pressable onPress={() => handleDelete(item._id)} style={{ padding: 4 }} disabled={deleteMutation.isPending}>
                {deleteMutation.isPending ? <ActivityIndicator size="small" color={colors.danger} /> : <I.trash size={14} color={colors.danger} />}
              </Pressable>
            )}
          </HStack>
          <Text style={{ color: colors.text, fontSize: 14, lineHeight: 20 }}>{commentText}</Text>
        </VStack>
      </HStack>
    );
  };

  if (!isVisible) return null;

  return (
    <Modal transparent animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <HStack className="items-center justify-between" style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <HStack space="sm" className="items-center">
            <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>Comments</Text>
            {comments?.length ? (
              <View style={{ backgroundColor: colors.primary + '15', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: colors.primary }}>{comments.length}</Text>
              </View>
            ) : null}
          </HStack>
          <Pressable onPress={onClose} style={{ padding: 4 }}>
            <I.close size={22} color={colors.sub} />
          </Pressable>
        </HStack>

        {isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading comments...</Text>
          </View>
        ) : !comments?.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
            <I.comment size={48} color={colors.sub} strokeWidth={1.2} />
            <Text style={{ color: colors.sub, fontSize: 15, marginTop: 12, textAlign: 'center' }}>No comments yet</Text>
          </View>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(i) => i._id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        <HStack space="sm" style={{ paddingHorizontal: 16, paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.border, paddingBottom: bottom + 10, backgroundColor: colors.bg }}>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Write a comment..."
            placeholderTextColor={colors.sub}
            multiline
            style={{ flex: 1, backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.inputBorder, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, color: colors.text, fontSize: 14, maxHeight: 100 }}
          />
          <Pressable onPress={handleSend} disabled={createMutation.isPending || !content.trim()} style={{ backgroundColor: colors.primary, borderRadius: 10, width: 42, alignItems: 'center', justifyContent: 'center', opacity: !content.trim() ? 0.5 : 1 }}>
            {createMutation.isPending ? <ActivityIndicator size="small" color="#fff" /> : <I.send size={18} color="#fff" />}
          </Pressable>
        </HStack>
      </SafeAreaView>
    </Modal>
  );
}
