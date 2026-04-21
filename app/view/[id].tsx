import { HtmlContent } from '@/components/details/html-content';
import { UserNavigationDrawer } from '@/components/drawer/user-navigation-drawer';
import { Matrix } from '@/components/matrix';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { ActionItem } from '@/types/actionItem';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, Pressable, Text as RNText, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const I = ENTITY_ICONS;

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

  const { bg: bgColor, text: textColor, sub: secondaryText, primary, secondary, border, card: cardBg, success, danger } = colors;

  const org = organisation;

  const communityLinks: ActionItem[] = [
    { id: 'wall', label: 'Wall', icon: <I.wall size={24} color={colors.primary} />, onPress: () => router.push(`/view/wall/${id}`), color: 'primary' as const },
    { id: 'groups', label: 'Groups', icon: <I.group size={24} color={colors.primary} />, onPress: () => router.push(`/view/groups /${id}`), color: 'primary' as const },
    { id: 'events', label: 'Events', icon: <I.event size={24} color={colors.primary} />, onPress: () => router.push(`/view/events/${id}`), color: 'primary' as const },
  ];

  const infoLinks: ActionItem[] = [
    { id: 'wall', label: 'Announcements', icon: <I.announcement size={24} color={colors.secondary} />, onPress: () => router.push(`/view/announcements/${id}`), color: 'primary' as const },
    { id: 'information', label: 'Information', icon: <I.information size={24} color={colors.secondary} />, onPress: () => router.push(`/view/informations/${id}`), color: 'primary' as const },
  ];

  const resourceLinks: ActionItem[] = [
    { id: 'user-request', label: 'My Requests', icon: <I.userRequest size={24} color={colors.secondary} />, onPress: () => router.push(`/view/user-requests/${id}`), color: 'primary' as const },
    { id: 'booking', label: 'Bookings', icon: <I.booking size={24} color={colors.secondary} />, onPress: () => router.push(`/view/bookings/${id}`), color: 'primary' as const },
  ];

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
          contentContainerStyle={{ padding: 20, gap: 16 }}
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

              {canAccessAdmin && (
                <View
                  style={{
                    marginHorizontal: 5,
                    borderRadius: 12,
                    padding: 5,
                    backgroundColor: cardBg,
                    shadowColor: textColor,
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  <Pressable
                    onPress={() => router.push(`/admin/${id}` as any)}
                    style={({ pressed }) => ({
                      marginTop: 8,
                      borderRadius: 12,
                      backgroundColor: primary + (pressed ? '25' : '12'),
                      borderWidth: 2,
                      borderColor: primary + (pressed ? 'FF' : '50'),
                      shadowColor: primary,
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
                          <RNText style={{ fontSize: 13, fontWeight: '600', color: primary }}>Switch to Admin Mode</RNText>
                          <RNText style={{ fontSize: 11, color: secondaryText, marginTop: 2 }}>View admin options</RNText>
                        </View>
                      </HStack>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <I.chevronRight size={18} color={primary} />
                      </View>
                    </HStack>
                  </Pressable>
                </View>
              )}

              {org?.description ? <HtmlContent label="Description" html={org.description} /> : null}
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
            </View>
          )}
          <Matrix row={communityLinks} index={0} onClose={() => {}} />
          <Matrix row={infoLinks} index={1} onClose={() => {}} />
          <Matrix row={resourceLinks} index={2} onClose={() => {}} />
        </ScrollView>
      )}
    </View>
  );
}
