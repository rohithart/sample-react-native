import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const I = ENTITY_ICONS;

interface LinkedFieldProps {
  label: string;
  value?: string | null;
  icon: EntityIconKey;
  route?: string;
}

export function LinkedField({ label, value, icon, route }: LinkedFieldProps) {
  const router = useRouter();
  const { card, text, sub, border, primary, bg } = useThemeColors();
  const Icon = ENTITY_ICONS[icon];

  const containerStyle = {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: card,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 14,
  };

  const content = (
    <HStack space="md" style={{ alignItems: 'center' }}>
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          backgroundColor: value ? primary + '10' : bg,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: value ? 0 : 1,
          borderColor: border,
          borderStyle: value ? 'solid' : 'dashed'
        }}
      >
        <Icon size={18} color={value ? primary : sub} />
      </View>
      
      <VStack style={{ flex: 1 }}>
        <Text style={{ 
          fontSize: 10, 
          fontWeight: '700', 
          color: sub, 
          textTransform: 'uppercase', 
          letterSpacing: 0.5 
        }}>
          {label}
        </Text>
        <Text style={{ 
          fontSize: 15, 
          fontWeight: '700', 
          color: value ? text : sub 
        }} numberOfLines={1}>
          {value || `No ${label}`}
        </Text>
      </VStack>

      {route && value && (
        <View style={{ padding: 4, backgroundColor: bg, borderRadius: 8 }}>
          <I.chevronRight size={14} color={sub} />
        </View>
      )}
    </HStack>
  );

  if (route && value) {
    return (
      <Pressable
        onPress={() => router.push(route as any)}
        style={({ pressed }) => ({
          ...containerStyle,
          opacity: pressed ? 0.8 : 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: pressed ? 0.05 : 0,
          shadowRadius: 2,
          elevation: pressed ? 1 : 0,
        })}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{content}</View>;
}
