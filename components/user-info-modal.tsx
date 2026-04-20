import React from 'react';
import { Modal, ScrollView, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import type { UserRole } from '@/types';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { Role } from '@/enums';

const I = ENTITY_ICONS;

interface UserInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  userRole: UserRole | null;
}

export function UserInfoModal({ isVisible, onClose, userRole }: UserInfoModalProps) {
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();

  if (!userRole) return null;

  const userName = userRole.user?.name || 'Unknown User';
  const userEmail = userRole.user?.email || 'No email';
  const userPhone = userRole.user?.phone || 'No phone';
  const userImage = userRole.user?.image;
  const userRole_name = userRole.role || 'User';
  const userDescription = userRole.description || 'No description';

  return (
    <Modal transparent animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <HStack className="items-center justify-between" style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>User Information</Text>
          <Button onPress={onClose} className="bg-transparent p-0">
            <I.close size={22} color={colors.sub} />
          </Button>
        </HStack>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <VStack className="items-center mb-8">
            {userImage ? (
              <Box
                className="w-20 h-20 rounded-full items-center justify-center mb-4 overflow-hidden"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Image
                  source={{ uri: userImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </Box>
            ) : (
              <Box
                className="w-20 h-20 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Text className="text-4xl">👤</Text>
              </Box>
            )}

            <Text className="text-xl font-bold text-center">{userName}</Text>
            <Text className="text-sm mt-1" style={{ color: colors.primary }}>
              {userRole_name}
            </Text>
          </VStack>

          <Box
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}
          >
            <Text className="font-semibold mb-4" style={{ fontSize: 16 }}>
              Personal Information
            </Text>

            <Box className="flex-row items-center mb-4">
              <Box
                className="w-10 h-10 rounded-lg items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '10' }}
              >
                <I.mail size={20} color={colors.primary} />
              </Box>
              <Box className="flex-1">
                <Text className="text-xs" style={{ color: colors.sub }}>
                  Email
                </Text>
                <Text className="font-medium">{userEmail}</Text>
              </Box>
            </Box>

            <Box className="flex-row items-center mb-4">
              <Box
                className="w-10 h-10 rounded-lg items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '10' }}
              >
                <I.phone size={20} color={colors.primary} />
              </Box>
              <Box className="flex-1">
                <Text className="text-xs" style={{ color: colors.sub }}>
                  Phone
                </Text>
                <Text className="font-medium">{userPhone}</Text>
              </Box>
            </Box>

            <Box className="flex-row items-center">
              <Box
                className="w-10 h-10 rounded-lg items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '10' }}
              >
                <I.shield size={20} color={colors.primary} />
              </Box>
              <Box className="flex-1">
                <Text className="text-xs" style={{ color: colors.sub }}>
                  Description
                </Text>
                <Text className="font-medium">{userDescription}</Text>
              </Box>
            </Box>
          </Box>

          <Box className="mb-6">
            <Box
              className="rounded-lg p-3"
              style={{
                backgroundColor: userRole.role === Role.ADMIN? colors.dangerBg : colors.successBg,
              }}
            >
              <Box className="flex-row items-center gap-2">
                <I.shield size={18} color={userRole.role === Role.ADMIN? colors.danger : colors.success} />
                <Text
                  className="font-semibold text-sm"
                  style={{ color: userRole.role === Role.ADMIN? colors.danger : colors.success }}
                >
                  {userRole.role}
                </Text>
              </Box>
            </Box>
          </Box>
        </ScrollView>

        <Box style={{ paddingHorizontal: 16, paddingBottom: bottom + 16 }}>
          <Button onPress={onClose} size="lg" className="w-full" style={{ backgroundColor: colors.primary }}>
            <ButtonText style={{ color: '#ffffff' }}>Close</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </Modal>
  );
}