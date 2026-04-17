import React, { useCallback, useState } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import { UserInfoModal } from '@/components/user-info-modal';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Box } from 'lucide-react-native';

interface UserAvatarProps {
  userRole: any;
}

export function UserAvatar({ userRole }: UserAvatarProps) {
  const colors = useThemeColors();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <Pressable onPress={handlePress}>
        {userRole.user?.image ? (
              <Box
                className="w-20 h-20 rounded-full items-center justify-center mb-4 overflow-hidden"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Image
                  source={{ uri: userRole.user?.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <Image source={{ uri: userRole.user.image }} style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1 }} />
              </Box>
            ) : (
              <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primary + '20', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary }}>{userRole.user.email?.[0] || ''}</Text>
        </View>
            )}
      </Pressable>
      <UserInfoModal
        isVisible={isModalVisible}
        onClose={handleClose}
        userRole={userRole}
      />
    </>
  );
}