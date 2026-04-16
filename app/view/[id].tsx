import { HtmlContent } from '@/components/details/html-content';
import { UserNavigationDrawer } from '@/components/drawer/user-navigation-drawer';
import { Button } from '@/components/ui/button';
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

export default function UserDashboard() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top, bottom } = useSafeAreaInsets();
  const colors = useThemeColors();
  const router = useRouter();
  const { organisation, userRole, canAccessAdmin, isLoadingAccess, hydrateFromOrgId } = useOrganisationContext();
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

  const communityLinks: QuickLink[] = [
    { label: 'Wall', icon: 'wall', route: `/view/wall/${id}`, accent: 'primary' },
    { label: 'Groups', icon: 'group', route: `/view/groups/${id}`, accent: 'secondary' },
    { label: 'My Requests', icon: 'userRequest', route: `/view/user-requests/${id}`, accent: 'primary' },
  ];

  const infoLinks: QuickLink[] = [
    { label: 'Announcements', icon: 'announcement', route: `/view/announcements/${id}`, accent: 'primary' },
    { label: 'Meetings', icon: 'meeting', route: `/view/meetings/${id}`, accent: 'secondary' },
    { label: 'Votes', icon: 'vote', route: `/view/votes/${id}`, accent: 'primary' },
    { label: 'Information', icon: 'information', route: `/view/informations/${id}`, accent: 'secondary' },
  ];

  const resourceLinks: QuickLink[] = [
    { label: 'Events', icon: 'event', route: `/view/events/${id}`, accent: 'primary' },
    { label: 'Bookings', icon: 'booking', route: `/view/bookings/${id}`, accent: 'secondary' },
  ];

  const renderQuickLink = (link: QuickLink) => {
    const Icon = ENTITY_ICONS[link.icon];
    const color = link.accent === 'primary' ? primary : secondary;
    return (
      <Pressable
        key={link.label}
        onPress={() => router.push(link.route as any)}
        style={({ pressed }) => ({
          width: '47%',
          padding: 16,
          borderRadius: 14,
          backgroundColor: pressed ? pressedColor : (link.accent === 'primary' ? cardPrimaryBg : cardSecondaryBg),
          gap: 10,
          borderWidth: 1,
          borderColor: border,
        })}
      >
        <Icon size={24} color={color} />
        <RNText style={{ fontSize: 13, fontWeight: '600', color: textColor }}>{link.label}</RNText>
      </Pressable>
    );
  };

  const renderSection = (title: string, links: QuickLink[]) => (
    <View key={title} style={{ gap: 10 }}>
      <RNText style={{ fontSize: 12, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', color: secondaryText }}>
        {title}
      </RNText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {links.map(renderQuickLink)}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: bgColor, paddingBottom: bottom }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: org?.name || 'Dashboard',
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

      <UserNavigationDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        drawerAnim={drawerAnim}
        topInset={top}
        orgId={id}
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
            <View style={{ height: 8, backgroundColor: secondary }} />
            <View style={{ padding: 16, gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {org?.image ? (
                  <Image source={{ uri: org.image }} style={{ width: 52, height: 52, borderRadius: 14, borderWidth: 1, borderColor: border }} />
                ) : (
                  <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: secondary + '20', alignItems: 'center', justifyContent: 'center' }}>
                    <I.organisation size={24} color={secondary} />
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

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTopWidth: 1, borderTopColor: border }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: secondary + '15' }}>
                    <RNText style={{ fontSize: 11, fontWeight: '700', color: secondary }}>{userRole?.role || 'VIEWER'}</RNText>
                  </View>
                  <RNText style={{ fontSize: 12, color: secondaryText }}>Switch to Admin mode</RNText>
                </View>
                {canAccessAdmin && (
                  <Pressable
                    onPress={() => router.push(`/admin/${id}` as any)}
                    style={({ pressed }) => ({
                      flexDirection: 'row', alignItems: 'center', gap: 4,
                      paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
                      backgroundColor: primary + '12',
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <I.chevronRight size={14} color={primary} />
                  </Pressable>
                )}
              </View>

              {org?.description ? <HtmlContent label="Description" html={org.description} /> : null}

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {org?.address ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <I.mapPin size={13} color={secondaryText} />
                    <RNText style={{ fontSize: 12, color: secondaryText }} numberOfLines={1}>{org.address}</RNText>
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
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: secondary + '15', alignItems: 'center', justifyContent: 'center' }}>
                  <I.user size={20} color={secondary} />
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
              <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: secondary + '15' }}>
                <RNText style={{ fontSize: 10, fontWeight: '700', color: secondary }}>{userRole.role}</RNText>
              </View>
            </View>
          )}

          {renderSection('Community', communityLinks)}
          {renderSection('Information & Communication', infoLinks)}
          {renderSection('Resources', resourceLinks)}
        </ScrollView>
      )}
    </View>
  );
}
