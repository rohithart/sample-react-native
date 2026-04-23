import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Animated } from 'react-native';
import { DrawerDivider, DrawerItem, DrawerSectionHeading } from './drawer-items';
import { NavigationDrawer } from './navigation-drawer';

interface AdminNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerAnim: Animated.Value;
  topInset: number;
  orgId: string;
  orgName?: string;
}

export function AdminNavigationDrawer({
  isOpen,
  onClose,
  drawerAnim,
  topInset,
  orgId,
  orgName = 'Organisation',
}: AdminNavigationDrawerProps) {
  const { primary: c, secondary } = useThemeColors();
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
      <DrawerSectionHeading title="Admin" />
      <DrawerItem icon={<I.shield size={16} color={secondary} />} label="User mode" onPress={() => go(`/view/${orgId}`)} />

      <DrawerSectionHeading title={orgName} />
      <DrawerItem icon={<I.dashboard size={16} color={c} />} label="Dashboard" onPress={() => go(`/admin/${orgId}`)} />
      <DrawerItem icon={<I.mySpace size={16} color={c} />} label="My space" onPress={() => go(`/admin/me/${orgId}`)} />
      <DrawerItem icon={<I.wall size={16} color={c} />} label="Discussions" onPress={() => go(`/admin/wall/${orgId}`)} />

      {hasAccess('workflow') && (
        <>
          <DrawerDivider />
          <DrawerSectionHeading title="Workflows" />
          <DrawerItem icon={<I.workflow size={16} color={c} />} label="All workflows" onPress={() => go(`/admin/workflows/${orgId}`)} />
          <DrawerItem icon={<I.category size={16} color={c} />} label="Categories" onPress={() => go(`/admin/categories/${orgId}`)} indent />
          <DrawerItem icon={<I.task size={16} color={c} />} label="Tasks" onPress={() => go(`/admin/tasks/${orgId}`)} />
          <DrawerItem icon={<I.evidence size={16} color={c} />} label="Evidences" onPress={() => go(`/admin/evidences/${orgId}`)} />
        </>
      )}

      {hasAccess('vendor') && (
        <>
          <DrawerDivider />
          <DrawerSectionHeading title="Vendors" />
          <DrawerItem icon={<I.vendor size={16} color={c} />} label="Vendors" onPress={() => go(`/admin/vendors/${orgId}`)} />
          <DrawerItem icon={<I.quote size={16} color={c} />} label="Quotes" onPress={() => go(`/admin/quotes/${orgId}`)} />
          <DrawerItem icon={<I.workorder size={16} color={c} />} label="Work orders" onPress={() => go(`/admin/workorders/${orgId}`)} />
          <DrawerItem icon={<I.invoice size={16} color={c} />} label="Invoices" onPress={() => go(`/admin/invoices/${orgId}`)} />
        </>
      )}

      {hasAccess('communication') && (
        <>
          <DrawerDivider />
          <DrawerSectionHeading title="Communication" />
          <DrawerItem icon={<I.announcement size={16} color={c} />} label="Announcements" onPress={() => go(`/admin/announcements/${orgId}`)} />
          <DrawerItem icon={<I.meeting size={16} color={c} />} label="Meetings" onPress={() => go(`/admin/meetings/${orgId}`)} />
          <DrawerItem icon={<I.vote size={16} color={c} />} label="Votes" onPress={() => go(`/admin/votes/${orgId}`)} />
          <DrawerItem icon={<I.userRequest size={16} color={c} />} label="User requests" onPress={() => go(`/admin/user-requests/${orgId}`)} />
          <DrawerItem icon={<I.reminder size={16} color={c} />} label="Reminders" onPress={() => go(`/admin/reminders/${orgId}`)} />
          <DrawerItem icon={<I.booking size={16} color={c} />} label="All bookings" onPress={() => go(`/admin/bookings/${orgId}`)} />
          <DrawerItem icon={<I.bookingType size={16} color={c} />} label="Booking types" onPress={() => go(`/admin/booking-types/${orgId}`)} indent />
        </>
      )}

      {hasAccess('asset') && (
        <>
          <DrawerDivider />
          <DrawerSectionHeading title="Asset Management" />
          <DrawerItem icon={<I.asset size={16} color={c} />} label="All assets" onPress={() => go(`/admin/assets/${orgId}`)} />
          <DrawerItem icon={<I.assetType size={16} color={c} />} label="Asset types" onPress={() => go(`/admin/asset-types/${orgId}`)} indent />
          <DrawerItem icon={<I.document size={16} color={c} />} label="Document store" onPress={() => go(`/admin/documents/${orgId}`)} />
        </>
      )}

      {hasAccess('finance') && (
        <>
          <DrawerDivider />
          <DrawerSectionHeading title="Finance" />
          <DrawerItem icon={<I.financialYear size={16} color={c} />} label="Financial year" onPress={() => go(`/admin/financial-years/${orgId}`)} />
          <DrawerItem icon={<I.chartOfAccount size={16} color={c} />} label="Chart of Accounts" onPress={() => go(`/admin/chart-of-accounts/${orgId}`)} />
          <DrawerItem icon={<I.budget size={16} color={c} />} label="Budgets" onPress={() => go(`/admin/budgets/${orgId}`)} />
          <DrawerItem icon={<I.ledger size={16} color={c} />} label="Ledgers" onPress={() => go(`/admin/ledgers/${orgId}`)} />
          <DrawerItem icon={<I.transaction size={16} color={c} />} label="Transactions" onPress={() => go(`/admin/transactions/${orgId}`)} />
        </>
      )}

      {hasAccess('analytics') && (
        <>
          <DrawerDivider />
          <DrawerSectionHeading title="Analytics" />
          <DrawerItem icon={<I.dashboard size={16} color={c} />} label="Workflow" onPress={() => go(`/admin/analytics/${orgId}`)} />
          <DrawerItem icon={<I.dashboard size={16} color={c} />} label="Balance sheet" onPress={() => go(`/admin/analytics/balance-sheet/${orgId}`)} />
          <DrawerItem icon={<I.incomeStatement size={16} color={c} />} label="Income statement" onPress={() => go(`/admin/analytics/income-expense/${orgId}`)} />
        </>
      )}

      <DrawerDivider />
      <DrawerSectionHeading title="Attachments" />
      <DrawerItem icon={<I.gallery size={16} color={c} />} label="All images" onPress={() => go(`/admin/images/${orgId}`)} />
      <DrawerItem icon={<I.attachment size={16} color={c} />} label="All attachments" onPress={() => go(`/admin/attachments/${orgId}`)} />

      {hasAccess('user') && (
        <>
          <DrawerDivider />
          <DrawerSectionHeading title="Users & Groups" />
          <DrawerItem icon={<I.user size={16} color={c} />} label="Users" onPress={() => go(`/admin/users/${orgId}`)} />
          <DrawerItem icon={<I.group size={16} color={c} />} label="Groups" onPress={() => go(`/admin/groups/${orgId}`)} />
        </>
      )}

      <DrawerDivider />
      <DrawerSectionHeading title="General" />
      <DrawerItem icon={<I.event size={16} color={c} />} label="All events" onPress={() => go(`/admin/events/${orgId}`)} />
      <DrawerItem icon={<I.eventType size={16} color={c} />} label="Event types" onPress={() => go(`/admin/event-types/${orgId}`)} indent />
      <DrawerItem icon={<I.information size={16} color={c} />} label="Other information" onPress={() => go(`/admin/informations/${orgId}`)} />
      <DrawerItem icon={<I.help size={16} color={c} />} label="Help" onPress={() => go('/admin/help')} />

      <DrawerDivider />
      <DrawerSectionHeading title="Contact DarthVader" />
      <DrawerItem icon={<I.support size={16} color={secondary} />} label="Support" onPress={() => go('/help/support')} />
      <DrawerDivider />
    </NavigationDrawer>
  );
}
