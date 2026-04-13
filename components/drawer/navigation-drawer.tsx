import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { LogOut, Settings, X } from 'lucide-react-native';
import { Alert, Animated, ScrollView, View } from 'react-native';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerAnim: Animated.Value;
  topInset: number;
  children: React.ReactNode;
}

export function NavigationDrawer({
  isOpen,
  onClose,
  drawerAnim,
  topInset,
  children,
}: NavigationDrawerProps) {
  const colors = useThemeColors();
  const { logout } = useAuth();
  const router = useRouter();

  const handleSettings = () => {
    onClose();
    router.push('/settings');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          onClose();
          await logout();
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && (
        <Box
          className="absolute inset-0 bg-black/30 z-40"
          onTouchEnd={onClose}
        />
      )}

      {/* Drawer */}
      <Animated.View
        style={[
          {
            transform: [{ translateX: drawerAnim }],
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 300,
            zIndex: 50,
            backgroundColor: colors.bg,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 16,
          },
        ]}
      >
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
          {/* User Header */}
          <Box
            className="px-6 py-4"
            style={{ borderBottomWidth: 1, borderColor: colors.border }}
          >
            <Box className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold">Account</Text>
              <Button
                size="md"
                className="bg-transparent"
                onPress={onClose}
              >
                <X size={24} color={colors.icon} />
              </Button>
            </Box>
            <Box
              className="rounded-lg p-3"
              style={{ backgroundColor: colors.card }}
            >
              <Text className="font-semibold text-base">John Doe</Text>
              <Text className="text-sm" style={{ color: colors.sub }}>
                john@example.com
              </Text>
            </Box>
          </Box>

          {/* Menu Items (Children) — scrollable for long menus */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ gap: 4, paddingHorizontal: 12, paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>

          {/* Settings & Logout Footer */}
          <Box className="px-4 pb-6 gap-3">
            <Button
              action="secondary"
              className="w-full"
              style={{ borderColor: colors.border }}
              onPress={handleSettings}
            >
              <Settings size={20} color={colors.primary} />
              <ButtonText style={{ color: colors.primary }}>
                Settings
              </ButtonText>
            </Button>

            <Button
              className="w-full"
              style={{
                backgroundColor: colors.dangerBg,
                borderWidth: 1,
                borderColor: colors.danger,
              }}
              onPress={handleLogout}
            >
              <LogOut size={20} color={colors.danger} />
              <ButtonText style={{ color: colors.danger }}>
                Logout
              </ButtonText>
            </Button>
          </Box>
        </View>
      </Animated.View>
    </>
  );
}
