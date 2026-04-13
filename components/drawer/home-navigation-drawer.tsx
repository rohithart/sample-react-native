import { useThemeColors } from '@/hooks/use-theme-colors';
import { BarChart3, Home, Rocket } from 'lucide-react-native';
import { Animated } from 'react-native';
import { DrawerItem } from './drawer-items';
import { NavigationDrawer } from './navigation-drawer';

interface HomeNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerAnim: Animated.Value;
  topInset: number;
}

export function HomeNavigationDrawer({
  isOpen,
  onClose,
  drawerAnim,
  topInset,
}: HomeNavigationDrawerProps) {
  const { primary } = useThemeColors();

  return (
    <NavigationDrawer
      isOpen={isOpen}
      onClose={onClose}
      drawerAnim={drawerAnim}
      topInset={topInset}
    >
      {/* Home Menu Items */}
      <DrawerItem
        icon={<Home size={20} color={primary} />}
        label="Home"
        onPress={onClose}
      />
      <DrawerItem
        icon={<Rocket size={20} color={primary} />}
        label="Features"
        onPress={onClose}
      />
      <DrawerItem
        icon={<BarChart3 size={20} color={primary} />}
        label="Analytics"
        onPress={onClose}
      />
    </NavigationDrawer>
  );
}


