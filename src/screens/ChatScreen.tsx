import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { chatService } from '@firebase/index';
import { useOrganisationStore } from '@store/index';
import { useAuthStore } from '@store/index';
import { ChatMessage } from '@types/index';
import { Card, Header, Button } from '@components/index';
import { Colors, Spacing, Typography } from '@constants/index';
import { formatTime } from '@utils/index';

export function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { selectedOrganisation } = useOrganisationStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!selectedOrganisation) return;

    const unsubscribe = chatService.subscribeToMessages(
      selectedOrganisation.id,
      setMessages
    );

    return unsubscribe;
  }, [selectedOrganisation]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedOrganisation || !user) return;

    const message: ChatMessage = {
      id: Math.random().toString(),
      organisationId: selectedOrganisation.id,
      senderId: user.id,
      senderName: user.name,
      content: newMessage,
      timestamp: Date.now(),
      avatar: user.avatar,
    };

    try {
      setIsLoading(true);
      await chatService.sendMessage(selectedOrganisation.id, message);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.message,
        item.senderId === user?.id ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <Card>
        <Text style={styles.senderName}>{item.senderName}</Text>
        <Text style={styles.messageContent}>{item.content}</Text>
        <Text style={styles.timestamp}>{formatTime(new Date(item.timestamp))}</Text>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Chat" subtitle={selectedOrganisation?.name} />

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
        style={styles.messageList}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          maxHeight={100}
        />
        <Button
          title="Send"
          onPress={handleSendMessage}
          disabled={!newMessage.trim() || isLoading}
          size="small"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  messageList: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.md,
  },
  message: {
    marginBottom: Spacing.md,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  senderName: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  messageContent: {
    ...Typography.body1,
    color: Colors.text,
  },
  timestamp: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.light,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 14,
  },
});
