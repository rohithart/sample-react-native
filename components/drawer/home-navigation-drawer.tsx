import { Animated } from 'react-native';
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

  return (
    <NavigationDrawer
      isOpen={isOpen}
      onClose={onClose}
      drawerAnim={drawerAnim}
      topInset={topInset}
      >
      
    </NavigationDrawer>
  );
}

