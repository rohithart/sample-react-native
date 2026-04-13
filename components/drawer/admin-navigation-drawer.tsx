import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import {
    BarChart3,
    Bookmark,
    BookOpen,
    Box as BoxIcon,
    Building2,
    CalendarDays,
    ClipboardList,
    FileText,
    Folder,
    GitBranch,
    HelpCircle,
    Image,
    Info,
    Paperclip,
    PiggyBank,
    Radio,
    Receipt,
    Tag,
    ThumbsUp,
    TrendingUp,
    Users,
    Video,
    Wrench,
} from 'lucide-react-native';
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
      <DrawerSectionHeading title="Organisations" />
      <DrawerItem icon={<Building2 size={16} color={c} />} label="All organisations" onPress={() => go('/home')} />
      <DrawerItem icon={<FileText size={16} color={c} />} label="New organisation" onPress={() => go('/home')} />

      <DrawerDivider />
      <DrawerSectionHeading title={orgName} />
      <DrawerItem icon={<BarChart3 size={16} color={c} />} label="Dashboard" onPress={() => go(`/admin/${orgId}`)} />
      <DrawerItem icon={<Users size={16} color={c} />} label="My space" onPress={() => go(`/admin/me/${orgId}`)} />
      <DrawerItem icon={<Radio size={16} color={c} />} label="Discussions" onPress={() => go(`/admin/wall/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Workflows" />
      <DrawerItem icon={<GitBranch size={16} color={c} />} label="All workflows" onPress={() => go(`/admin/workflows/${orgId}`)} />
      <DrawerItem icon={<Tag size={16} color={c} />} label="Categories" onPress={() => go(`/admin/categories/${orgId}`)} indent />
      <DrawerItem icon={<ClipboardList size={16} color={c} />} label="Tasks" onPress={() => go(`/admin/tasks/${orgId}`)} />
      <DrawerItem icon={<FileText size={16} color={c} />} label="Evidences" onPress={() => go(`/admin/evidences/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Vendors" />
      <DrawerItem icon={<Building2 size={16} color={c} />} label="Vendors" onPress={() => go(`/admin/vendors/${orgId}`)} />
      <DrawerItem icon={<Receipt size={16} color={c} />} label="Quotes" onPress={() => go(`/admin/quotes/${orgId}`)} />
      <DrawerItem icon={<Wrench size={16} color={c} />} label="Work orders" onPress={() => go(`/admin/workorders/${orgId}`)} />
      <DrawerItem icon={<FileText size={16} color={c} />} label="Invoices" onPress={() => go(`/admin/invoices/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Communication" />
      <DrawerItem icon={<FileText size={16} color={c} />} label="Announcements" onPress={() => go(`/admin/announcements/${orgId}`)} />
      <DrawerItem icon={<Video size={16} color={c} />} label="Meetings" onPress={() => go(`/admin/meetings/${orgId}`)} />
      <DrawerItem icon={<ThumbsUp size={16} color={c} />} label="Votes" onPress={() => go(`/admin/votes/${orgId}`)} />
      <DrawerItem icon={<Users size={16} color={c} />} label="User requests" onPress={() => go(`/admin/user-requests/${orgId}`)} />
      <DrawerItem icon={<Bookmark size={16} color={c} />} label="All bookings" onPress={() => go(`/admin/bookings/${orgId}`)} />
      <DrawerItem icon={<Tag size={16} color={c} />} label="Booking types" onPress={() => go(`/admin/booking-types/${orgId}`)} indent />

      <DrawerDivider />
      <DrawerSectionHeading title="Asset Management" />
      <DrawerItem icon={<BoxIcon size={16} color={c} />} label="All assets" onPress={() => go(`/admin/assets/${orgId}`)} />
      <DrawerItem icon={<Tag size={16} color={c} />} label="Asset types" onPress={() => go(`/admin/asset-types/${orgId}`)} indent />
      <DrawerItem icon={<Folder size={16} color={c} />} label="Document store" onPress={() => go(`/admin/documents/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Finance" />
      <DrawerItem icon={<CalendarDays size={16} color={c} />} label="Financial year" onPress={() => go(`/admin/financial-years/${orgId}`)} />
      <DrawerItem icon={<TrendingUp size={16} color={c} />} label="Chart of Accounts" onPress={() => go(`/admin/chart-of-accounts/${orgId}`)} />
      <DrawerItem icon={<PiggyBank size={16} color={c} />} label="Budgets" onPress={() => go(`/admin/budgets/${orgId}`)} />
      <DrawerItem icon={<BookOpen size={16} color={c} />} label="Ledgers" onPress={() => go(`/admin/ledgers/${orgId}`)} />
      <DrawerItem icon={<FileText size={16} color={c} />} label="Transactions" onPress={() => go(`/admin/transactions/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Analytics" />
      <DrawerItem icon={<BarChart3 size={16} color={c} />} label="Workflow" onPress={() => go(`/admin/analytics/${orgId}`)} />
      <DrawerItem icon={<BarChart3 size={16} color={c} />} label="Balance sheet" onPress={() => go(`/admin/analytics/balance-sheet/${orgId}`)} />
      <DrawerItem icon={<TrendingUp size={16} color={c} />} label="Income statement" onPress={() => go(`/admin/analytics/income-expense/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Attachments" />
      <DrawerItem icon={<Image size={16} color={c} />} label="All images" onPress={() => go(`/admin/images/${orgId}`)} />
      <DrawerItem icon={<Paperclip size={16} color={c} />} label="All attachments" onPress={() => go(`/admin/attachments/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="Users & Groups" />
      <DrawerItem icon={<Users size={16} color={c} />} label="Users" onPress={() => go(`/admin/users/${orgId}`)} />
      <DrawerItem icon={<Users size={16} color={c} />} label="Groups" onPress={() => go(`/admin/groups/${orgId}`)} />

      <DrawerDivider />
      <DrawerSectionHeading title="General" />
      <DrawerItem icon={<CalendarDays size={16} color={c} />} label="All events" onPress={() => go(`/admin/events/${orgId}`)} />
      <DrawerItem icon={<Tag size={16} color={c} />} label="Event types" onPress={() => go(`/admin/event-types/${orgId}`)} indent />
      <DrawerItem icon={<Info size={16} color={c} />} label="Other information" onPress={() => go(`/admin/informations/${orgId}`)} />
      <DrawerItem icon={<HelpCircle size={16} color={c} />} label="Help" onPress={() => go('/admin/help')} />
    </NavigationDrawer>
  );
}
