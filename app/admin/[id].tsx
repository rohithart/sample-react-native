import { HtmlContent } from '@/components/details';
import { AdminNavigationDrawer } from '@/components/drawer/admin-navigation-drawer';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, Pressable, Text as RNText, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const I = ENTITY_ICONS;

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
  const { card, text, isDark } = useThemeColors();

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
        { label: 'I.user Requests', icon: 'userRequest', route: `/admin/user-requests/${id}`, accent: 'primary' },
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
              <I.menu size={24} color={textColor} />
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
          <View style={{ borderRadius: 16, backgroundColor: cardBg, borderWidth: 1, borderColor: border, overflow: 'hidden' }}>
            <View style={{ height: 8, backgroundColor: primary }} />
            <View style={{ padding: 16, gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {org?.image ? (
                  <Image source={{ uri: org.image }} style={{ width: 52, height: 52, borderRadius: 14, borderWidth: 1, borderColor: border }} />
                ) : (
                  <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: primary + '20', alignItems: 'center', justifyContent: 'center' }}>
                    <I.organisation size={24} color={primary} />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <RNText style={{ fontSize: 18, fontWeight: '700', color: textColor }} numberOfLines={1}>
                    {org?.name || 'Organisation'}
                  </RNText>
                  {org?.address ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <I.mapPin size={13} color={secondaryText} />
                      <RNText style={{ fontSize: 12, color: secondaryText }} numberOfLines={1}>{org.address}</RNText>
                    </View>
                  ) : null}
                </View>
                <View style={{
                  paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
                  backgroundColor: org?.isActive ? success + '15' : danger + '15',
                }}>
                  <RNText style={{ fontSize: 11, fontWeight: '600', color: org?.isActive ? success : danger }}>
                    {org?.isActive ? 'Active' : 'Inactive'}
                  </RNText>
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 5,
                  borderRadius: 12,
                  padding: 5,
                  backgroundColor: card,
                  shadowColor: text,
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: isDark ? 0.35 : 0.15,
                  shadowRadius: 8,
                  elevation: 8, 
                }}
              >
                <Pressable
                onPress={() => router.push(`/view/${id}` as any)}
                style={({ pressed }) => ({
                  marginTop: 8,
                  borderRadius: 12,
                  backgroundColor: secondary + (pressed ? '25' : '12'),
                  borderWidth: 2,
                  borderColor: secondary + (pressed ? 'FF' : '50'),
                  shadowColor: secondary,
                  shadowOpacity: pressed ? 0.4 : 0.1,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: pressed ? 6 : 2,
                  transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                })}
              >
                <HStack space="lg" style={{ justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12 }}>
                  <HStack space="md" style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                      <RNText style={{ fontSize: 13, fontWeight: '600', color: secondary }}>Switch to User Mode</RNText>
                      <RNText style={{ fontSize: 11, color: secondaryText, marginTop: 2 }}>View as regular user</RNText>
                    </View>
                  </HStack>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <I.chevronRight size={18} color={secondary} />
                  </View>
                </HStack>
              </Pressable>
            </View>

             

              {org?.description ? <HtmlContent label="Description" html={org.description} /> : null}

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {org?.timezone ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <I.globe size={13} color={secondaryText} />
                    <RNText style={{ fontSize: 12, color: secondaryText }}>{org.timezone}</RNText>
                  </View>
                ) : null}
                {org?.identifier ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <I.shield size={13} color={secondaryText} />
                    <RNText style={{ fontSize: 12, color: secondaryText }}>{org.identifier}</RNText>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          {userRole?.user && (
            <View style={{ borderRadius: 14, backgroundColor: cardBg, borderWidth: 1, borderColor: border, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              {userRole.user.image ? (
                <Image source={{ uri: userRole.user.image }} style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: border }} />
              ) : (
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: primary + '15', alignItems: 'center', justifyContent: 'center' }}>
                  <I.user size={20} color={primary} />
                </View>
              )}
              <View style={{ flex: 1, gap: 2 }}>
                <RNText style={{ fontSize: 15, fontWeight: '700', color: textColor }} numberOfLines={1}>
                  {userRole.user.name || 'User'}
                </RNText>
                {userRole.user.email ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <I.mail size={11} color={secondaryText} />
                    <RNText style={{ fontSize: 12, color: secondaryText }} numberOfLines={1}>{userRole.user.email}</RNText>
                  </View>
                ) : null}
                {userRole.user.phone ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <I.phone size={11} color={secondaryText} />
                    <RNText style={{ fontSize: 12, color: secondaryText }}>{userRole.user.phone}</RNText>
                  </View>
                ) : null}
              </View>
              <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: primary + '15' }}>
                <RNText style={{ fontSize: 10, fontWeight: '700', color: primary }}>{userRole.role}</RNText>
              </View>
            </View>
          )}

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

          {visibleSections.map((section) => (
            <View key={section.title} style={{ gap: 10 }}>
              <RNText style={{ fontSize: 12, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', color: secondaryText }}>
                {section.title}
              </RNText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {section.links.map(renderQuickLink)}
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
