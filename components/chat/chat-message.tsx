import type { Message, UserRole } from '@/types';
import { useToggleReaction, useDeleteMessage } from '@/services/message';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, Text, View } from 'react-native';
import { UserAvatar } from '../user-avatar';
import { HStack } from '../ui/hstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';

interface ChatMessageProps {
  message: Message;
  currentUser: UserRole | null;
  conversationId: string;
  orgId: string;
}

const COMMON_EMOJIS = ['👍', '👎', '❤️', '😂', '😄', '😮', '😢', '😡', '🤔', '👏', '🙌', '🎉', '🔥', '🚀', '💯', '✅', '❌', '👀', '💡', '🙏'];

export function ChatMessage({ message, currentUser, conversationId, orgId }: ChatMessageProps) {
   const I = ENTITY_ICONS;
  const colors = useThemeColors();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReadByModal, setShowReadByModal] = useState(false);
  const deleteMutation = useDeleteMessage(conversationId);
  const reactionMutation = useToggleReaction(message._id, conversationId);
  const isMine = currentUser?._id === message.sender?._id;

  const bubbleStyle: any = {
    alignSelf: isMine ? 'flex-end' as const : 'flex-start' as const,
    backgroundColor: isMine ? colors.primary : colors.card,
    borderColor: isMine ? colors.primary : colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    minWidth: '75%',
    maxWidth: 280,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  };

  const textColor = isMine ? '#fff' : colors.text;
  const createdAt = new Date(message.createdAt).toLocaleString('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const reactions = message.reactions
    ? message.reactions instanceof Map
      ? Array.from(message.reactions.entries())
      : Object.entries(message.reactions as Record<string, any[]>)
    : [];

  const handleAddEmoji = (emoji: string) => {
    if (!conversationId) return;
    reactionMutation.mutate({ emoji, organisation: orgId });
    setShowEmojiPicker(false);
  };

  const handleDelete = () => {
    if (!isMine) return;
    Alert.alert('Delete message', 'Are you sure you want to delete this message?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate(message._id) },
    ]);
  };

  const renderReadByItem = (item: any) => {
    const readAt = item.readAt ? new Date(item.readAt).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' }) : 'Unknown';
    return (
      <View key={`${item.email}-${readAt}`} style={{ marginBottom: 10 }}>
        <Text style={{ color: colors.text, fontWeight: '700' }}>{item.email || item.name || 'Unknown reader'}</Text>
        <Text style={{ color: colors.sub, fontSize: 12 }}>{readAt}</Text>
      </View>
    );
  };

  return (
    <View style={{ alignSelf: isMine ? 'flex-end' : 'flex-start', marginVertical: 6, width: '100%' }}>
      <HStack space="sm" className="items-center" style={{ alignSelf: isMine ? 'flex-end' : 'flex-start' }}>
        {!isMine ? <UserAvatar userRole={message.sender} /> : null}

        <View style={bubbleStyle}>
          <Pressable onPress={() => setShowReadByModal(true)}>
            {message.isDeleted ? (
              <Text style={{ color: colors.sub, fontStyle: 'italic', fontSize: 14 }}>This message was deleted</Text>
            ) : (
              <Text style={{ color: textColor, fontSize: 14, lineHeight: 20 }}>{message.content}</Text>
            )}

            <Text style={{ color: textColor, fontSize: 11, marginTop: 8, textAlign: 'right', opacity: 0.8 }}>
              {createdAt}{message.isEdited ? ' · edited' : ''}
            </Text>
          </Pressable>

            <HStack space="sm" className="flex-wrap" style={{ marginTop: 8 }}>
               <Pressable onPress={() => setShowEmojiPicker((prev) => !prev)} style={{ paddingVertical: 6, paddingHorizontal: 6, borderRadius: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
                <I.smile size={15} color={colors.success} />
              </Pressable>
              {reactions?.map(([emoji, users]) => (
                <View key={emoji} style={{ backgroundColor: colors.inputBg, borderRadius: 16, paddingHorizontal: 8, paddingVertical: 4, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, marginRight: 4 }}>{emoji}</Text>
                  <Text style={{ color: colors.text, fontSize: 12 }}>{Array.isArray(users) ? users.length : users}</Text>
                </View>
              ))}
              {isMine ? (
              <Pressable onPress={handleDelete} style={{ paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, backgroundColor: colors.dangerBg, borderWidth: 1, borderColor: colors.danger }}>
                <I.trash size={20} color={colors.danger} />
              </Pressable>
            ) : null}
            </HStack>
        </View>
      </HStack>

      {showEmojiPicker ? (
        <View style={{ marginTop: 8, padding: 10, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, flexWrap: 'wrap', flexDirection: 'row' }}>
          {COMMON_EMOJIS.map((emoji) => (
            <Pressable key={emoji} onPress={() => handleAddEmoji(emoji)} style={{ padding: 8, margin: 4, borderRadius: 12, backgroundColor: colors.inputBg }}>
              <Text style={{ fontSize: 18 }}>{emoji}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <Modal transparent animationType="slide" visible={showReadByModal} onRequestClose={() => setShowReadByModal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: colors.bg, borderRadius: 18, padding: 18, maxHeight: '80%' }}>
            <HStack className="justify-between items-center" style={{ marginBottom: 12 }}>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>Read by</Text>
              <Pressable onPress={() => setShowReadByModal(false)} style={{ padding: 6 }}>
                <Text style={{ color: colors.primary, fontSize: 14 }}>Close</Text>
              </Pressable>
            </HStack>

            {message.readBy?.length ? (
              message.readBy.map((item: any) => renderReadByItem(item))
            ) : (
              <Text style={{ color: colors.sub, fontSize: 14 }}>No one has read this message yet.</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
