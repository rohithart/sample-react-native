import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import React from 'react';

const I = ENTITY_ICONS;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  onBack?: () => void;
  icon?: EntityIconKey;
}

export function PageHeader({ title, subtitle, rightAction, onBack, icon }: PageHeaderProps) {
  const router = useRouter();
  const { card, text, sub, border, primary } = useThemeColors();
  const IconComponent = icon ? ENTITY_ICONS[icon] : null;

  return (
    <View style={{
      backgroundColor: card,
      borderBottomWidth: 1,
      borderColor: border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 3,
      zIndex: 10,
    }}>
      <HStack
        className="items-center justify-between"
        style={{
          paddingHorizontal: 8,
          paddingVertical: 12,
          minHeight: 60,
        }}
      >
        <HStack space="xs" style={{ alignItems: 'center', flex: 1 }}>
          <Pressable 
            onPress={onBack ?? (() => router.back())} 
            style={({ pressed }) => ({
              padding: 10,
              borderRadius: 20,
              backgroundColor: pressed ? primary + '10' : 'transparent',
            })}
          >
            <I.back size={22} color={text} />
          </Pressable>

          <HStack space="sm" style={{ alignItems: 'center', flex: 1, marginLeft: 4 }}>
            {IconComponent && (
              <View style={{ 
                width: 34, 
                height: 34, 
                borderRadius: 10, 
                backgroundColor: primary + '10', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: primary + '20'
              }}>
                <IconComponent size={18} color={primary} />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text
                style={{ 
                  fontSize: 18, 
                  fontWeight: '700', 
                  color: text, 
                  letterSpacing: -0.5,
                }}
                numberOfLines={1}
              >
                {title}
              </Text>
              {subtitle && (
                <Text style={{ fontSize: 11, color: sub, marginTop: 1 }} numberOfLines={1}>
                  {subtitle}
                </Text>
              )}
            </View>
          </HStack>
        </HStack>

        {rightAction && (
          <View style={{ paddingRight: 8 }}>
            {rightAction}
          </View>
        )}
      </HStack>
    </View>
  );
}
