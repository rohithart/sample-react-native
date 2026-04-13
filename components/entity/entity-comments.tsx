import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useComments, useCreateComment, useDeleteComment } from '@/services/comment';
import type { Comment } from '@/types';
import { MessageSquare, Send, Trash2, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type CommentEntity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'vendor' | 'document' | 'asset' | 'booking' | 'request' | 'meeting' | 'transaction' | 'financial-year';

interface EntityCommentsProps {
  isVisible: boolean;
  onClose: () => void;
  entity: CommentEntity;
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
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (!content.trim()) return;
    createMutation.mutate({ content: content.trim(), entityType: entity, entityId }, {
      onSuccess: () => setContent(''),
    });
  };

  const renderItem = ({ item }: { item: Comment }) => (
    <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, gap: 6 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: colors.sub, fontSize: 11 }}>{new Date(item.createdAt).toLocaleString()}</Text>
        {isAdmin && (
          <Pressable onPress={() => deleteMutation.mutate(item.id)} style={{ padding: 4 }} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? <ActivityIndicator size="small" color={colors.danger} /> : <Trash2 size={14} color={colors.danger} />}
          </Pressable>
        )}
      </View>
      <Text style={{ color: colors.text, fontSize: 14, lineHeight: 20 }}>{item.content}</Text>
    </View>
  );

  if (!isVisible) return null;

  return (
    <Modal transparent animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>Comments</Text>
          <Pressable onPress={onClose} style={{ padding: 4 }}>
            <X size={22} color={colors.sub} />
          </Pressable>
        </View>

        {/* Content */}
        {isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading comments...</Text>
          </View>
        ) : !comments?.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
            <MessageSquare size={48} color={colors.sub} strokeWidth={1.2} />
            <Text style={{ color: colors.sub, fontSize: 15, marginTop: 12, textAlign: 'center' }}>No comments yet</Text>
          </View>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Input bar */}
        {isAdmin && (
          <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, gap: 8, borderTopWidth: 1, borderTopColor: colors.border, paddingBottom: bottom + 10 }}>
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Write a comment..."
              placeholderTextColor={colors.sub}
              multiline
              style={{ flex: 1, backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.inputBorder, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, color: colors.text, fontSize: 14, maxHeight: 100 }}
            />
            <Pressable onPress={handleSend} disabled={createMutation.isPending || !content.trim()} style={{ backgroundColor: colors.primary, borderRadius: 10, width: 42, alignItems: 'center', justifyContent: 'center', opacity: !content.trim() ? 0.5 : 1 }}>
              {createMutation.isPending ? <ActivityIndicator size="small" color="#fff" /> : <Send size={18} color="#fff" />}
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}
