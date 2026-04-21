import { Animated } from 'react-native';
import { NavigationDrawer } from './navigation-drawer';
import { DrawerItem, DrawerSectionHeading } from './drawer-items';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { router } from 'expo-router';

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
  const { secondary } = useThemeColors();
  const I = ENTITY_ICONS;
  const go = (url: string) => { onClose(); router.push(url as any); };

  return (
    <NavigationDrawer
      isOpen={isOpen}
      onClose={onClose}
      drawerAnim={drawerAnim}
      topInset={topInset}
      >
        <DrawerSectionHeading title="DarthVader" />
        <DrawerItem icon={<I.support size={16} color={secondary} />} label="Support" onPress={() => go('/help/support')} />
      
    </NavigationDrawer>
  );
}

