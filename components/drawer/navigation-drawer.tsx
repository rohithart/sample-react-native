import { Text } from '@/components/ui/text';
import { AccountCard } from '@/components/account-card';
import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { Alert, Animated } from 'react-native';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { DrawerItem } from './drawer-items';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { View } from '@/components/ui/view';

const I = ENTITY_ICONS;

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerAnim: Animated.Value;
  topInset: number;
  children: React.ReactNode;
}

export function NavigationDrawer({ isOpen, onClose, drawerAnim, topInset, children }: NavigationDrawerProps) {
  const colors = useThemeColors();
  const { logout } = useAuth();
  const router = useRouter();

  const handleAction = (route: string) => {
    onClose();
    router.push(route as any);
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
      {isOpen && (
        <Pressable 
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 40 }} 
          onPress={onClose} 
        />
      )}

      <Animated.View
        style={{
          transform: [{ translateX: drawerAnim }],
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 280,
          zIndex: 50,
          backgroundColor: colors.card,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 4, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 16,
        }}
      >
        <View style={{ flex: 1, paddingTop: topInset }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 22, fontWeight: '800', color: colors.text }}>Menu</Text>
              <Pressable onPress={onClose} style={{ padding: 4 }}>
                <I.close size={22} color={colors.sub} />
              </Pressable>
            </View>
            <AccountCard onPress={onClose} />
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 12, gap: 4 }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>

          <View style={{ 
            padding: 16, 
            borderTopWidth: 1, 
            borderColor: colors.border,
            gap: 4,
            marginBottom: 20 
          }}>
            <DrawerItem 
              label="Settings"
              onPress={() => handleAction('/settings')}
              icon={<I.settings size={16} color={colors.primary} />}
            />
            <DrawerItem 
              icon={<I.logOut size={16} color={colors.danger} />}
              label="Logout" 
              onPress={handleLogout} 
            />
          </View>
        </View>
      </Animated.View>
    </>
  );
}
