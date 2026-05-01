import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { router } from 'expo-router';
import React from 'react';

const I = ENTITY_ICONS;

interface DashboardCardProps {
  title: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  labels: string[];
  values: (number | undefined)[];
  textColors: string[];
  backgroundColors: string[];
  route: string;
}

export const DashboardCard = ({ title, icon: Icon, labels, values, textColors, backgroundColors, route }: DashboardCardProps) => {
  const colors = useThemeColors();
  return (
    <View style={{ 
      backgroundColor: colors.card, 
      borderRadius: 24, 
      padding: 16, 
      borderWidth: 1, 
      borderColor: colors.border,
      marginBottom: 16
    }}>
      <HStack space="md" style={{ alignItems: 'center', marginBottom: 16 }}>
        <View style={{ padding: 8, backgroundColor: colors.primary + '10', borderRadius: 10 }}>
          <Icon size={18} color={colors.primary} />
        </View>
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text, flex: 1 }}>{title}</Text>
        <Pressable onPress={() => router.push(route as any)} style={{ padding: 4 }}>
          <I.chevronRight size={16} color={colors.sub} />
        </Pressable>
      </HStack>

      <HStack space="sm">
        {values.map((value, index) => (
          value !== undefined && (
            <View key={index} style={{ flex: 1, alignItems: 'center', padding: 10, backgroundColor: backgroundColors[index], borderRadius: 14 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: textColors[index] }}>{value}</Text>
              <Text style={{ fontSize: 10, fontWeight: '700', color: textColors[index], textTransform: 'uppercase' }}>{labels[index]}</Text>
              </View>
          )
        ))}
      </HStack>
    </View>
  );
};