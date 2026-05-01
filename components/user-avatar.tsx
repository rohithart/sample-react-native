import React, { useCallback, useState } from 'react';

import { UserInfoModal } from '@/components/user-info-modal';
import { UserDisplay } from './user';
import { Pressable } from '@/components/ui/pressable';

interface UserAvatarProps {
  userRole: any;
}

export function UserAvatar({ userRole }: UserAvatarProps) {
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
        <UserDisplay userRole={userRole} />
      </Pressable>
      <UserInfoModal
        isVisible={isModalVisible}
        onClose={handleClose}
        userRole={userRole}
      />
    </>
  );
}