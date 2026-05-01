import React from 'react';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColors } from '@/hooks/use-theme-colors';

interface UserDisplayProps {
  userRole: any;
}

export function UserDisplay({ userRole }: UserDisplayProps) {
  const colors = useThemeColors();

  return (
    <View style={{width: '100%'}}>
      {userRole.user?.image ? (
        <View
          style={{ width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16, overflow: 'hidden', backgroundColor: colors.primary + '20' }}
        >
          <Image source={{ uri: userRole.user.image }} style={{ width: 80, height: 80, borderRadius: 40 }} resizeMode="cover" />
        </View>
      ) : (
      <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primary + '20', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary }}>{userRole.user.email?.[0] || ''}</Text>
      </View>
          )}
    </View>
  );
}