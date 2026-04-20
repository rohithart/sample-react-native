import React from 'react';
import { ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { ENTITY_ICONS } from '@/constants/entity-icons';

const I = ENTITY_ICONS;

export default function ProfileScreen() {
  const colors = useThemeColors();
  const { userRole, organisation, isAdmin, canAccessAdmin } = useOrganisationContext();

  const userName = userRole?.user?.name || 'John Doe';
  const userEmail = userRole?.user?.email || 'john@example.com';
  const userPhone = userRole?.user?.phone || 'Not provided';
  const userRole_name = userRole?.role || 'User';
  const userDescription = userRole?.description || '--';
  const orgName = organisation?.name || 'No organization selected';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Profile',
          headerBackTitle: 'Back',
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.bg },
          headerTitleStyle: { color: colors.text, fontWeight: '600' },
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Box className="items-center mb-8">
          {userRole?.user?.image ? (
            <Box
              className="w-24 h-24 rounded-full items-center justify-center mb-4 overflow-hidden"
              style={{ backgroundColor: colors.primary + '20' }}
            >
              <Image
                source={{ uri: userRole.user.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </Box>
          ) : (
            <Box
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: colors.primary + '20' }}
            >
              <Text className="text-5xl">👤</Text>
            </Box>
          )}

          <Text className="text-2xl font-bold text-center">{userName}</Text>
          <Text className="text-sm mt-2" style={{ color: colors.primary }}>
            {userRole_name}
          </Text>
        </Box>

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

        {organisation && (
          <Box
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}
          >
            <Text className="font-semibold mb-4" style={{ fontSize: 16 }}>
              Organization
            </Text>

            <Box className="flex-row items-center mb-4">
              <Box
                className="w-10 h-10 rounded-lg items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '10' }}
              >
                <I.organisation size={20} color={colors.primary} />
              </Box>
              <Box className="flex-1">
                <Text className="text-xs" style={{ color: colors.sub }}>
                  Organization Name
                </Text>
                <Text className="font-medium">{orgName}</Text>
              </Box>
            </Box>
          </Box>
        )}

        <Box className="mb-6">
          <Box
            className="rounded-lg p-3"
            style={{
              backgroundColor: isAdmin ? colors.dangerBg : colors.successBg,
            }}
          >
            <Box className="flex-row items-center gap-2">
              <I.shield size={18} color={isAdmin ? colors.danger : colors.success} />
              <Text
                className="font-semibold text-sm"
                style={{ color: isAdmin ? colors.danger : colors.success }}
              >
                {canAccessAdmin
                  ? isAdmin
                    ? 'Administrator Access'
                    : 'Admin Panel Access'
                  : 'Limited Access'}
              </Text>
            </Box>
          </Box>
        </Box>

        <Box className="gap-3 mt-4">
          <Button
            size="lg"
            className="w-full"
            style={{ backgroundColor: colors.primary }}
          >
            <I.edit size={20} color="#ffffff" />
            <ButtonText style={{ color: '#ffffff' }}>Edit Profile</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
