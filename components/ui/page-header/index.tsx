import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';

interface PageHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  onBack?: () => void;
}

export function PageHeader({ title, rightAction, onBack }: PageHeaderProps) {
  const router = useRouter();
  const { card, text, border } = useThemeColors();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: border,
        backgroundColor: card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
        <Pressable onPress={onBack ?? (() => router.back())} style={{ padding: 4 }}>
          <ChevronLeft size={24} color={text} />
        </Pressable>
        <Text
          style={{ fontSize: 18, fontWeight: '700', color: text, flex: 1 }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      {rightAction}
    </View>
  );
}
