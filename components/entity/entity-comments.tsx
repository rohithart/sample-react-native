import { HStack } from '@/components/ui/hstack';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useComments, useCreateComment, useDeleteComment } from '@/services/comment';
import type { Comment } from '@/types';
import { UserAvatar } from '@/components/user-avatar';

import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useReportComment } from '@/services/email';
import { EntityType } from '@/enums';
import { convertToRelativeTime } from '@/utils/date';

const I = ENTITY_ICONS;

interface EntityCommentsProps {
  isVisible: boolean;
  onClose: () => void;
  entity: EntityType;
  entityId: string;
  orgId: string;
}

export function EntityComments({ isVisible, onClose, entity, entityId, orgId }: EntityCommentsProps) {
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();
  const { isAdmin } = useOrganisationContext();
  const { data: comments, isLoading } = useComments(entity, entityId);
  const createMutation = useCreateComment(orgId, entity, entityId);
  const deleteMutation = useDeleteComment(entity, entityId);
  const reportMutation = useReportComment();
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (!content.trim()) return;
    createMutation.mutate({ comment: content.trim(), entityType: entity, entityId, organisation: orgId } as any, {
      onSuccess: () => setContent(''),
    });
  };

  const handleReport = useCallback((id: string, org: any) => {
    const data: any = {organisation: org}
    Alert.alert('Report Comment', 'Are you sure you want to report this comment?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Report', style: 'destructive', onPress: () => reportMutation.mutateAsync({ id, data }) },
    ]);
  }, [reportMutation]);

  const handleDelete = useCallback((id: string) => {
    Alert.alert('Delete Comment', 'Are you sure you want to delete this comment?', [
      { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate(id) },
    ]);
  }, [deleteMutation]);

  const renderItem = ({ item }: { item: Comment }) => {
    const userRole = (item as any).user || (item as any).user?.user;
    const commentText = (item as any).comment || (item as any).content || '';

    return (
      <HStack space="sm" className="items-center">
        <UserAvatar userRole={userRole} />

        <HStack className="justify-between" style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 10, flex: 1}}>
          <View>
            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>{commentText}</Text>
            <Text style={{ fontSize: 11, color: colors.sub, marginTop: 4 }}>{convertToRelativeTime(item.createdAt)}</Text>
          </View>
          <HStack space="sm" className="items-center">
            <Pressable onPress={() => handleReport(item._id, item.organisation)} style={{ padding: 4 }} disabled={reportMutation.isPending}>
              {reportMutation.isPending ? <ActivityIndicator size="small" color={colors.danger} /> : <I.warning size={14} color={colors.warning} />}
            </Pressable>
            {isAdmin && (
            <Pressable onPress={() => handleDelete(item._id)} style={{ padding: 4 }} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? <ActivityIndicator size="small" color={colors.danger} /> : <I.trash size={14} color={colors.danger} />}
            </Pressable>
              )}
          </HStack>
        </HStack>
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
