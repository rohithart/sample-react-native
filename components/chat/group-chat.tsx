import type { Group, Message } from '@/types';
import { useConversationForGroup, useCreateConversation } from '@/services/conversation';
import { useMessages, useSendMessage } from '@/services/message';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { ChatMessage } from '@/components/chat/chat-message';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';

interface GroupChatProps {
  orgId: string;
  groupId: string;
  group: Group;
}

export function GroupChat({ orgId, groupId, group }: GroupChatProps) {
  const colors = useThemeColors();
  const { userRole } = useOrganisationContext();
  const [newMessage, setNewMessage] = useState('');
  const listRef = useRef<FlatList<Message>>(null);

  const { data: conversation, isLoading: isConversationLoading } = useConversationForGroup(groupId, orgId);
  const { data: messages, isLoading: isMessagesLoading } = useMessages(conversation?._id || '');
  const sendMessageMutation = useSendMessage(conversation?._id || '');
  const createConversationMutation = useCreateConversation();

  useEffect(() => {
    if (!isMessagesLoading && messages?.length) {
      listRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages, isMessagesLoading]);

  const handleCreateConversation = () => {
    createConversationMutation.mutate({ id: groupId, data: { organisation: orgId, group: groupId } as any });
  };

  const handleSend = () => {
    if (!conversation?._id || !newMessage.trim()) return;
    sendMessageMutation.mutate({ message: newMessage.trim(), organisation: orgId });
    setNewMessage('');
  };

  const canSend = Boolean(conversation?._id && newMessage.trim() && !group?.archived);

  return (
    <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.bg }}>
      {isConversationLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : !conversation ? (
        <View style={{ flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.sub, fontSize: 14, marginBottom: 12, textAlign: 'center' }}>
            No conversation yet. Start one to begin chatting.
          </Text>
          <Pressable
            onPress={handleCreateConversation}
            disabled={createConversationMutation.status === 'pending'}
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 10,
              opacity: createConversationMutation.status === 'pending' ? 0.65 : 1,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>Start conversation</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {isMessagesLoading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <FlatList
              ref={listRef}
              data={messages || []}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <ChatMessage message={item} currentUser={userRole} />}
              contentContainerStyle={{ padding: 16, paddingBottom: 12 }}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
              ListEmptyComponent={
                <Text style={{ color: colors.sub, fontSize: 14, textAlign: 'center', marginTop: 16 }}>
                  No messages yet. Say hello 👋
                </Text>
              }
            />
          )}

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
            {group?.archived ? (
              <View style={{ padding: 14, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.card }}>
                <Text style={{ color: colors.danger, textAlign: 'center' }}>
                  This group is archived. You cannot send new messages.
                </Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.card }}>
                <TextInput
                  value={newMessage}
                  onChangeText={setNewMessage}
                  placeholder="Type a message..."
                  placeholderTextColor={colors.sub}
                  multiline
                  style={{
                    flex: 1,
                    minHeight: 40,
                    maxHeight: 120,
                    backgroundColor: colors.inputBg,
                    borderWidth: 1,
                    borderColor: colors.inputBorder,
                    borderRadius: 20,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    color: colors.text,
                    fontSize: 14,
                    marginRight: 10,
                  }}
                />
                <Pressable
                  onPress={handleSend}
                  disabled={!canSend || sendMessageMutation.status === 'pending'}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: canSend ? colors.primary : colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: sendMessageMutation.status === 'pending' ? 0.75 : 1,
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>Send</Text>
                </Pressable>
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
}
