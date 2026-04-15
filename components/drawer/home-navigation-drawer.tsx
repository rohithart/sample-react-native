import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
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
  const I = ENTITY_ICONS;

  return (
    <NavigationDrawer
      isOpen={isOpen}
      onClose={onClose}
      drawerAnim={drawerAnim}
      topInset={topInset}
    >
      {/* Home Menu Items */}
      <DrawerItem
        icon={<I.home size={20} color={primary} />}
        label="Home"
        onPress={onClose}
      />
      <DrawerItem
        icon={<I.rocket size={20} color={primary} />}
        label="Features"
        onPress={onClose}
      />
      <DrawerItem
        icon={<I.dashboard size={20} color={primary} />}
        label="Analytics"
        onPress={onClose}
      />
    </NavigationDrawer>
  );
}


