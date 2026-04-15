import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Animated } from 'react-native';
import { DrawerDivider, DrawerItem, DrawerSectionHeading } from './drawer-items';
import { NavigationDrawer } from './navigation-drawer';

interface UserNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerAnim: Animated.Value;
  topInset: number;
  orgId: string;
}

export function UserNavigationDrawer({
  isOpen,
  onClose,
  drawerAnim,
  topInset,
  orgId,
}: UserNavigationDrawerProps) {
  const { primary: c } = useThemeColors();
  const router = useRouter();
  const I = ENTITY_ICONS;

  const go = (url: string) => { onClose(); router.push(url as any); };

  return (
    <NavigationDrawer
      isOpen={isOpen}
      onClose={onClose}
      drawerAnim={drawerAnim}
      topInset={topInset}
    >
      <DrawerSectionHeading title="Main" />
      <DrawerItem icon={<I.organisation size={16} color={c} />} label="Dashboard" onPress={() => go(`/view/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Community" />
      <DrawerItem icon={<I.wall size={16} color={c} />} label="Wall" onPress={() => go(`/view/wall/${orgId}`)} />
      <DrawerItem icon={<I.group size={16} color={c} />} label="Groups" onPress={() => go(`/view/groups/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Information" />
      <DrawerItem icon={<I.announcement size={16} color={c} />} label="Announcements" onPress={() => go(`/view/announcements/${orgId}`)} />
      <DrawerItem icon={<I.information size={16} color={c} />} label="Information" onPress={() => go(`/view/informations/${orgId}`)} />
      <DrawerItem icon={<I.meeting size={16} color={c} />} label="Meetings" onPress={() => go(`/view/meetings/${orgId}`)} />
      <DrawerItem icon={<I.vote size={16} color={c} />} label="Votes" onPress={() => go(`/view/votes/${orgId}`)} />
      <DrawerItem icon={<I.userRequest size={16} color={c} />} label="My Requests" onPress={() => go(`/view/user-requests/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Resources" />
      <DrawerItem icon={<I.event size={16} color={c} />} label="Events" onPress={() => go(`/view/events/${orgId}`)} />
      <DrawerItem icon={<I.booking size={16} color={c} />} label="Bookings" onPress={() => go(`/view/bookings/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Help" />
      <DrawerItem icon={<I.help size={16} color={c} />} label="Help & Support" onPress={() => go('/view/help')} />
    </NavigationDrawer>
  );
}
