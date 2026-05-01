import { Pressable } from '@/components/ui/pressable';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useDeleteMessage, useToggleReaction } from '@/services/message';
import type { Message, UserRole } from '@/types';
import { convertToLocalDateTimeString } from '@/utils/date';
import React, { useState } from 'react';
import { Alert, Modal } from 'react-native';
import { HStack } from '../ui/hstack';
import { VStack } from '../ui/vstack';
import { UserAvatar } from '../user-avatar';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

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
  const [showOptionModal, setShowOptionModal] = useState(false);
  const deleteMutation = useDeleteMessage(conversationId);
  const reactionMutation = useToggleReaction(message._id, conversationId);
  const isMine = currentUser?._id === message.sender?._id;

  const handleAddEmoji = (emoji: string) => {
    reactionMutation.mutate({ emoji, organisation: orgId });
    setShowEmojiPicker(false);
  };

  const renderReadByItem = (item: any) => {
    const readAt = convertToLocalDateTimeString(item.readAt) || 'Unknown';
     return (
       <View key={`${item.email}-${readAt}`} style={{ marginBottom: 10 }}>
         <Text style={{ color: colors.text, fontWeight: '700' }}>{item.email || item.name || 'Unknown reader'}</Text>
         <Text style={{ color: colors.sub, fontSize: 12 }}>{readAt}</Text>
       </View>
     );
   };

  const handleDelete = () => {
    Alert.alert('Delete?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate(message._id) },
    ]);
  };

  const reactions = message.reactions
    ? Object.entries(message.reactions as Record<string, any[]>).filter(([_, users]) => users.length > 0)
    : [];

  return (
    <View style={{ marginVertical: 4, paddingHorizontal: 12, width: '100%', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
      <HStack space="xs" style={{ alignItems: 'flex-end', maxWidth: '85%' }}>
        {!isMine && (
          <View style={{ marginBottom: 4 }}>
            <UserAvatar userRole={message.sender} />
          </View>
        )}

        <View>
          <Pressable 
            onLongPress={() => setShowOptionModal(true)}
            style={{
              paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, minWidth: 80,
              shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 2, elevation: 1,
              backgroundColor: isMine ? colors.primary : colors.card,
              borderBottomRightRadius: isMine ? 4 : 20,
              borderBottomLeftRadius: isMine ? 20 : 4,
            }}
          >
            {message.isDeleted ? (
              <Text style={{ fontSize: 14, fontStyle: 'italic', color: isMine ? '#eee' : colors.sub }}>
                This message was deleted
              </Text>
            ) : (
              <Text style={{ fontSize: 15, lineHeight: 20, color: isMine ? '#fff' : colors.text }}>
                {message.content}
              </Text>
            )}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 2 }}>
              <Text style={{ fontSize: 10, color: isMine ? 'rgba(255,255,255,0.7)' : colors.sub }}>
                {convertToLocalDateTimeString(message.createdAt)}
                {message.isEdited && ' • edited'}
              </Text>
              {isMine && (
                <Pressable onPress={() => setShowReadByModal(true)} style={{ marginLeft: 4 }}>
                  <I.checkCheck size={12} color={message.readBy?.length ? '#4ADE80' : 'rgba(255,255,255,0.5)'} />
                </Pressable>
              )}
            </View>
          </Pressable>

          {/* Floating Reactions */}
          {reactions.length > 0 && (
            <HStack space="xs" style={{ marginTop: -8, marginHorizontal: 8, alignSelf: isMine ? 'flex-end' : 'flex-start' }}>
              {reactions.map(([emoji, users]) => (
                <Pressable 
                  key={emoji} 
                  onPress={() => reactionMutation.mutate({ emoji, organisation: orgId })}
                  style={{ borderWidth: 1, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg, borderColor: colors.border }}
                >
                  <Text style={{ fontSize: 11 }}>{emoji} {users.length}</Text>
                </Pressable>
              ))}
              <Pressable onPress={() => setShowEmojiPicker(true)} style={{ borderWidth: 1, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg, borderColor: colors.border }}>
                <I.smilePlus size={12} color={colors.sub} />
              </Pressable>
            </HStack>
          )}
        </View>
      </HStack>

      <Modal transparent animationType="slide" visible={showEmojiPicker} onRequestClose={() => setShowEmojiPicker(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: colors.bg, borderRadius: 18, padding: 18, maxHeight: '80%' }}>
            <HStack className="justify-between items-center" style={{ marginBottom: 12 }}>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>Select a reaction</Text>
              <Pressable onPress={() => setShowEmojiPicker(false)} style={{ padding: 6 }}>
                <Text style={{ color: colors.primary, fontSize: 14 }}>Close</Text>
              </Pressable>
            </HStack>
        <View style={{ marginTop: 8, padding: 10, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, flexWrap: 'wrap', flexDirection: 'row' }}>
          {COMMON_EMOJIS.map((emoji) => (
            <Pressable key={emoji} onPress={() => handleAddEmoji(emoji)} style={{ padding: 8, margin: 4, borderRadius: 12, backgroundColor: colors.inputBg }}>
              <Text style={{ fontSize: 18 }}>{emoji}</Text>
            </Pressable>
          ))}
        </View>
        </View>
        </View>
      </Modal>

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

      <Modal transparent animationType="slide" visible={showOptionModal} onRequestClose={() => setShowOptionModal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: colors.bg, borderRadius: 18, padding: 18, maxHeight: '80%' }}>
            <HStack className="justify-between items-center" style={{ marginBottom: 12 }}>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>Options</Text>
              <Pressable onPress={() => setShowOptionModal(false)} style={{ padding: 6 }}>
                <Text style={{ color: colors.primary, fontSize: 14 }}>Close</Text>
              </Pressable>
            </HStack>

            <VStack space="md">
              <Pressable onPress={() => setShowReadByModal(true)} style={{ padding: 6 }}>
                <Text style={{ color: colors.primary, fontSize: 14 }}>Read by</Text>
              </Pressable>
              <Pressable onPress={() => setShowEmojiPicker(true)} style={{ padding: 6 }}>
                <Text style={{ color: colors.primary, fontSize: 14 }}>Add reaction</Text>
              </Pressable>
              { isMine && (
              <Pressable onPress={handleDelete} style={{ padding: 6 }}>
                <Text style={{ color: colors.primary, fontSize: 14 }}>Delete</Text>
              </Pressable>
              )}
            </VStack>
          </View>
        </View>
      </Modal>

    </View>
  );
}
