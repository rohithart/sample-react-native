import { HStack } from '@/components/ui/hstack';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface PageHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  onBack?: () => void;
  icon?: EntityIconKey;
}

export function PageHeader({ title, rightAction, onBack, icon }: PageHeaderProps) {
  const router = useRouter();
  const { card, text, border, primary } = useThemeColors();
  const IconComponent = icon ? ENTITY_ICONS[icon] : null;

  return (
    <HStack
      className="items-center justify-between"
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderColor: border,
        backgroundColor: card,
      }}
    >
      <HStack space="md" className="items-center flex-1">
        <Pressable onPress={onBack ?? (() => router.back())} style={{ padding: 4 }}>
          <ChevronLeft size={24} color={text} />
        </Pressable>
        {IconComponent && (
          <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: primary + '15', alignItems: 'center', justifyContent: 'center' }}>
            <IconComponent size={18} color={primary} />
          </View>
        )}
        <Text
          style={{ fontSize: 18, fontWeight: '700', color: text, flex: 1 }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </HStack>
      {rightAction}
    </HStack>
  );
}
