import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import {
    Bookmark,
    Building2,
    CalendarDays,
    FileText,
    HelpCircle,
    Info,
    Radio,
    Star,
    ThumbsUp,
    Users,
} from 'lucide-react-native';
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

  const go = (url: string) => { onClose(); router.push(url as any); };

  return (
    <NavigationDrawer
      isOpen={isOpen}
      onClose={onClose}
      drawerAnim={drawerAnim}
      topInset={topInset}
    >
      <DrawerSectionHeading title="Main" />
      <DrawerItem icon={<Building2 size={16} color={c} />} label="Dashboard" onPress={() => go(`/view/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Community" />
      <DrawerItem icon={<Radio size={16} color={c} />} label="Wall" onPress={() => go(`/view/wall/${orgId}`)} />
      <DrawerItem icon={<Users size={16} color={c} />} label="Groups" onPress={() => go(`/view/groups/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Information" />
      <DrawerItem icon={<FileText size={16} color={c} />} label="Announcements" onPress={() => go(`/view/announcements/${orgId}`)} />
      <DrawerItem icon={<Info size={16} color={c} />} label="Information" onPress={() => go(`/view/informations/${orgId}`)} />
      <DrawerItem icon={<CalendarDays size={16} color={c} />} label="Meetings" onPress={() => go(`/view/meetings/${orgId}`)} />
      <DrawerItem icon={<ThumbsUp size={16} color={c} />} label="Votes" onPress={() => go(`/view/votes/${orgId}`)} />
      <DrawerItem icon={<FileText size={16} color={c} />} label="My Requests" onPress={() => go(`/view/user-requests/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Resources" />
      <DrawerItem icon={<Star size={16} color={c} />} label="Events" onPress={() => go(`/view/events/${orgId}`)} />
      <DrawerItem icon={<Bookmark size={16} color={c} />} label="Bookings" onPress={() => go(`/view/bookings/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Help" />
      <DrawerItem icon={<HelpCircle size={16} color={c} />} label="Help & Support" onPress={() => go('/view/help')} />
    </NavigationDrawer>
  );
}
