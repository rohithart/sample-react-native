import type { Message, UserRole } from '@/types';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text, View } from 'react-native';
import { UserAvatar } from '../user-avatar';
import { HStack } from '../ui/hstack';

interface ChatMessageProps {
  message: Message;
  currentUser: UserRole | null;
}

export function ChatMessage({ message, currentUser }: ChatMessageProps) {
  const colors = useThemeColors();
  const isMine = currentUser?._id === message.sender?._id;
  const bubbleStyle = {
    alignSelf: isMine ? 'flex-end' as const : 'flex-start' as const,
    backgroundColor: isMine ? colors.primary : colors.card,
    borderColor: isMine ? colors.primary : colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
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

  return (
    <HStack space="sm" className="items-center" style={{ marginVertical: 4, alignSelf: isMine ? 'flex-end' : 'flex-start' }}>
      {!isMine ? (
        <UserAvatar userRole={message.sender} />
      ) : null}

      <View style={bubbleStyle}>
        {message.isDeleted ? (
          <Text style={{ color: colors.sub, fontStyle: 'italic', fontSize: 14 }}>This message was deleted</Text>
        ) : (
          <Text style={{ color: textColor, fontSize: 14, lineHeight: 20 }}>{message.content}</Text>
        )}

        <Text style={{ color: textColor, fontSize: 11, marginTop: 8, textAlign: 'right', opacity: 0.8 }}>
          {createdAt}{message.isEdited ? ' · edited' : ''}
        </Text>
      </View>
    </HStack>
  );
}
