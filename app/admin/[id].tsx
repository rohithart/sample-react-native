import { AdminNavigationDrawer } from '@/components/drawer/admin-navigation-drawer';
import { Button } from '@/components/ui/button';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  Building2,
  ChevronRight,
  Globe,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  User
} from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, Pressable, Text as RNText, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type QuickLink = {
  label: string;
  icon: EntityIconKey;
  route: string;
  accent: 'primary' | 'secondary';
};

type Section = {
  title: string;
  module?: string; // OrgAccess module key — hide section if disabled
  links: QuickLink[];
};

export default function AdminDashboard() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top, bottom } = useSafeAreaInsets();
  const colors = useThemeColors();
  const router = useRouter();
  const { organisation, orgAccess, userRole, isLoadingAccess, hydrateFromOrgId } = useOrganisationContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => { if (id) hydrateFromOrgId(id); }, [id, hydrateFromOrgId]);

  const toggleDrawer = useCallback(() => {
    const next = !isDrawerOpen;
    setIsDrawerOpen(next);
    Animated.timing(drawerAnim, {
      toValue: next ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDrawerOpen, drawerAnim]);

  const { bg: bgColor, text: textColor, sub: secondaryText, primary, secondary, pressed: pressedColor, border, cardPrimaryBg, cardSecondaryBg, card: cardBg, success, danger } = colors;

  const org = organisation;

  const sections: Section[] = [
    {
      title: 'People & Organisation',
      module: 'user',
      links: [
        { label: 'Users', icon: 'user', route: `/admin/users/${id}`, accent: 'primary' },
        { label: 'Groups', icon: 'group', route: `/admin/groups/${id}`, accent: 'secondary' },
        { label: 'User Requests', icon: 'userRequest', route: `/admin/user-requests/${id}`, accent: 'primary' },
      ],
    },
    {
      title: 'Workflows',
      module: 'workflow',
      links: [
        { label: 'Workflows', icon: 'workflow', route: `/admin/workflows/${id}`, accent: 'primary' },
        { label: 'Tasks', icon: 'task', route: `/admin/tasks/${id}`, accent: 'secondary' },
        { label: 'Evidence', icon: 'evidence', route: `/admin/evidences/${id}`, accent: 'primary' },
        { label: 'Categories', icon: 'category', route: `/admin/categories/${id}`, accent: 'secondary' },
      ],
    },
    {
      title: 'Vendors & Work',
      module: 'vendor',
      links: [
        { label: 'Vendors', icon: 'vendor', route: `/admin/vendors/${id}`, accent: 'primary' },
        { label: 'Quotes', icon: 'quote', route: `/admin/quotes/${id}`, accent: 'secondary' },
        { label: 'Work Orders', icon: 'workorder', route: `/admin/workorders/${id}`, accent: 'primary' },
        { label: 'Invoices', icon: 'invoice', route: `/admin/invoices/${id}`, accent: 'secondary' },
      ],
    },
    {
      title: 'Communication',
      module: 'communication',
      links: [
        { label: 'Announcements', icon: 'announcement', route: `/admin/announcements/${id}`, accent: 'primary' },
        { label: 'Meetings', icon: 'meeting', route: `/admin/meetings/${id}`, accent: 'secondary' },
        { label: 'Votes', icon: 'vote', route: `/admin/votes/${id}`, accent: 'primary' },
        { label: 'Bookings', icon: 'booking', route: `/admin/bookings/${id}`, accent: 'secondary' },
      ],
    },
    {
      title: 'Finance',
      module: 'finance',
      links: [
        { label: 'Financial Years', icon: 'financialYear', route: `/admin/financial-years/${id}`, accent: 'primary' },
        { label: 'Chart of Accounts', icon: 'chartOfAccount', route: `/admin/chart-of-accounts/${id}`, accent: 'secondary' },
        { label: 'Budgets', icon: 'budget', route: `/admin/budgets/${id}`, accent: 'primary' },
        { label: 'Ledger', icon: 'ledger', route: `/admin/ledgers/${id}`, accent: 'secondary' },
      ],
    },
    {
      title: 'Assets & Resources',
      module: 'asset',
      links: [
        { label: 'Assets', icon: 'asset', route: `/admin/assets/${id}`, accent: 'primary' },
        { label: 'Documents', icon: 'document', route: `/admin/documents/${id}`, accent: 'secondary' },
        { label: 'Events', icon: 'event', route: `/admin/events/${id}`, accent: 'primary' },
        { label: 'Information', icon: 'information', route: `/admin/informations/${id}`, accent: 'secondary' },
      ],
    },
    {
      title: 'Analytics',
      module: 'analytics',
      links: [
        { label: 'Workflow Analytics', icon: 'workflow', route: `/admin/analytics/${id}`, accent: 'primary' },
      ],
    },
  ];

  // Filter sections by org access
  const visibleSections = sections.filter((s) => {
    if (!s.module || !orgAccess) return true;
    return (orgAccess as any)[s.module] !== false;
  });

  const renderQuickLink = (link: QuickLink) => {
    const Icon = ENTITY_ICONS[link.icon];
    const color = link.accent === 'primary' ? primary : secondary;
    return (
      <Pressable
        key={link.label}
        onPress={() => router.push(link.route as any)}
        style={({ pressed }) => ({
          flex: 1,
          minWidth: '30%',
          padding: 14,
          borderRadius: 12,
          backgroundColor: pressed ? pressedColor : (link.accent === 'primary' ? cardPrimaryBg : cardSecondaryBg),
          gap: 8,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: border,
        })}
      >
        <Icon size={22} color={color} />
        <RNText style={{ fontSize: 11, fontWeight: '600', color: textColor, textAlign: 'center' }} numberOfLines={1}>
          {link.label}
        </RNText>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor, paddingBottom: bottom }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: org?.name || 'Admin',
          headerLeft: () => (
            <Button size="md" className="bg-transparent" onPress={toggleDrawer}>
              <Menu size={24} color={textColor} />
            </Button>
          ),
          headerTintColor: textColor,
          headerTitleStyle: { color: textColor, fontWeight: '600' },
          headerStyle: { backgroundColor: bgColor },
        }}
      />

      <AdminNavigationDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        drawerAnim={drawerAnim}
        topInset={top}
        orgId={id}
        orgName={org?.name}
      />

      {isLoadingAccess ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={primary} />
          <RNText style={{ color: secondaryText, fontSize: 14, marginTop: 10 }}>Loading organisation...</RNText>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24, gap: 16 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isDrawerOpen}
        >
          {/* Organisation card */}
          <View style={{ borderRadius: 16, backgroundColor: cardBg, borderWidth: 1, borderColor: border, overflow: 'hidden' }}>
            {/* Top banner */}
            <View style={{ height: 8, backgroundColor: primary }} />
            <View style={{ padding: 16, gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {org?.image ? (
                  <Image source={{ uri: org.image }} style={{ width: 52, height: 52, borderRadius: 14, borderWidth: 1, borderColor: border }} />
                ) : (
                  <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: primary + '20', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={24} color={primary} />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <RNText style={{ fontSize: 18, fontWeight: '700', color: textColor }} numberOfLines={1}>
                    {org?.name || 'Organisation'}
                  </RNText>
                  {org?.slug ? (
                    <RNText style={{ fontSize: 12, color: secondaryText, marginTop: 2 }}>@{org.slug}</RNText>
                  ) : null}
                </View>
                {/* Status */}
                <View style={{
                  paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
                  backgroundColor: org?.isActive ? success + '15' : danger + '15',
                }}>
                  <RNText style={{ fontSize: 11, fontWeight: '600', color: org?.isActive ? success : danger }}>
                    {org?.isActive ? 'Active' : 'Inactive'}
                  </RNText>
                </View>
              </View>

              {/* Description */}
              {org?.description ? (
                <RNText style={{ fontSize: 13, color: secondaryText, lineHeight: 19 }} numberOfLines={3}>
                  {org.description}
                </RNText>
              ) : null}

              {/* Details row */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {org?.address ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <MapPin size={13} color={secondaryText} />
                    <RNText style={{ fontSize: 12, color: secondaryText }} numberOfLines={1}>{org.address}</RNText>
                  </View>
                ) : null}
                {org?.timezone ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Globe size={13} color={secondaryText} />
                    <RNText style={{ fontSize: 12, color: secondaryText }}>{org.timezone}</RNText>
                  </View>
                ) : null}
                {org?.identifier ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Shield size={13} color={secondaryText} />
                    <RNText style={{ fontSize: 12, color: secondaryText }}>{org.identifier}</RNText>
                  </View>
                ) : null}
              </View>

              {/* Role + mode switch */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTopWidth: 1, borderTopColor: border }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: primary + '15' }}>
                    <RNText style={{ fontSize: 11, fontWeight: '700', color: primary }}>{userRole?.role || 'ADMIN'}</RNText>
                  </View>
                  <RNText style={{ fontSize: 12, color: secondaryText }}>Admin Dashboard</RNText>
                </View>
                <Pressable
                  onPress={() => router.push(`/view/${id}` as any)}
                  style={({ pressed }) => ({
                    flexDirection: 'row', alignItems: 'center', gap: 4,
                    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
                    backgroundColor: secondary + '12',
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <RNText style={{ fontSize: 12, fontWeight: '600', color: secondary }}>Member View</RNText>
                  <ChevronRight size={14} color={secondary} />
                </Pressable>
              </View>
            </View>
          </View>

          {/* User profile card */}
          {userRole?.user && (
            <View style={{ borderRadius: 14, backgroundColor: cardBg, borderWidth: 1, borderColor: border, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              {userRole.user.image ? (
                <Image source={{ uri: userRole.user.image }} style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: border }} />
              ) : (
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: primary + '15', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} color={primary} />
                </View>
              )}
              <View style={{ flex: 1, gap: 2 }}>
                <RNText style={{ fontSize: 15, fontWeight: '700', color: textColor }} numberOfLines={1}>
                  {userRole.user.name || 'User'}
                </RNText>
                {userRole.user.email ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Mail size={11} color={secondaryText} />
                    <RNText style={{ fontSize: 12, color: secondaryText }} numberOfLines={1}>{userRole.user.email}</RNText>
                  </View>
                ) : null}
                {userRole.user.phone ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Phone size={11} color={secondaryText} />
                    <RNText style={{ fontSize: 12, color: secondaryText }}>{userRole.user.phone}</RNText>
                  </View>
                ) : null}
              </View>
              <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: primary + '15' }}>
                <RNText style={{ fontSize: 10, fontWeight: '700', color: primary }}>{userRole.role}</RNText>
              </View>
            </View>
          )}

          {/* Module access badges */}
          {orgAccess && (
            <View style={{ gap: 8 }}>
              <RNText style={{ fontSize: 12, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', color: secondaryText }}>
                Enabled Modules
              </RNText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                {(['workflow', 'vendor', 'communication', 'asset', 'finance', 'analytics', 'user', 'ai'] as const).map((mod) => {
                  const enabled = (orgAccess as any)[mod] !== false;
                  return (
                    <View key={mod} style={{
                      paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
                      backgroundColor: enabled ? primary + '12' : secondaryText + '10',
                      borderWidth: 1, borderColor: enabled ? primary + '30' : 'transparent',
                    }}>
                      <RNText style={{
                        fontSize: 11, fontWeight: '600', textTransform: 'capitalize',
                        color: enabled ? primary : secondaryText,
                      }}>
                        {mod}
                      </RNText>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Quick links sections */}
          {visibleSections.map((section) => (
            <View key={section.title} style={{ gap: 10 }}>
              <RNText style={{ fontSize: 12, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', color: secondaryText }}>
                {section.title}
              </RNText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {section.links.map(renderQuickLink)}
                {/* Pad with empty views to maintain grid when < 3 items */}
                {section.links.length % 3 !== 0 && Array.from({ length: 3 - (section.links.length % 3) }).map((_, i) => (
                  <View key={`pad-${i}`} style={{ flex: 1, minWidth: '30%' }} />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
