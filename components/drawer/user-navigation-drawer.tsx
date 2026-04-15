import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useOrganisationContext } from '@/context/organisation-context';
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
  const { hasAccess } = useOrganisationContext();
  const I = ENTITY_ICONS;

  const go = (url: string) => { onClose(); router.push(url as any); };

  return (
    <NavigationDrawer
      isOpen={isOpen}
      onClose={onClose}
      drawerAnim={drawerAnim}
      topInset={topInset}
    >
      {/* GENERAL — always visible */}
      <DrawerSectionHeading title="Main" />
      <DrawerItem icon={<I.dashboard size={16} color={c} />} label="Dashboard" onPress={() => go(`/view/${orgId}`)} />
      <DrawerItem icon={<I.wall size={16} color={c} />} label="Discussions" onPress={() => go(`/view/wall/${orgId}`)} />
      <DrawerItem icon={<I.user size={16} color={c} />} label="Admins" onPress={() => go(`/view/admins/${orgId}`)} />

      {/* COMMUNICATION module — My space */}
      {hasAccess('communication') && (
        <>
          <DrawerDivider />
          <DrawerSectionHeading title="My space" />
          <DrawerItem icon={<I.group size={16} color={c} />} label="My groups" onPress={() => go(`/view/groups/${orgId}`)} />
          <DrawerItem icon={<I.booking size={16} color={c} />} label="My bookings" onPress={() => go(`/view/bookings/${orgId}`)} />
          <DrawerItem icon={<I.userRequest size={16} color={c} />} label="My requests" onPress={() => go(`/view/user-requests/${orgId}`)} />
        </>
      )}

      {/* COMMUNICATION module — Communication */}
      {hasAccess('communication') && (
        <>
          <DrawerDivider />
          <DrawerSectionHeading title="Communication" />
          <DrawerItem icon={<I.announcement size={16} color={c} />} label="Announcements" onPress={() => go(`/view/announcements/${orgId}`)} />
          <DrawerItem icon={<I.meeting size={16} color={c} />} label="Meetings" onPress={() => go(`/view/meetings/${orgId}`)} />
          <DrawerItem icon={<I.vote size={16} color={c} />} label="Votes" onPress={() => go(`/view/votes/${orgId}`)} />
        </>
      )}

      {/* GENERAL — always visible */}
      <DrawerDivider />
      <DrawerSectionHeading title="General" />
      <DrawerItem icon={<I.event size={16} color={c} />} label="Organisation events" onPress={() => go(`/view/events/${orgId}`)} />
      <DrawerItem icon={<I.information size={16} color={c} />} label="Other information" onPress={() => go(`/view/informations/${orgId}`)} />
      <DrawerItem icon={<I.help size={16} color={c} />} label="Help" onPress={() => go('/view/help')} />
    </NavigationDrawer>
  );
}
