import { DashboardCard } from '@/components/cards/dashboard-card';
import { HtmlContent } from '@/components/details/html-content';
import { UserNavigationDrawer } from '@/components/drawer/user-navigation-drawer';
import { Matrix } from '@/components/matrix';
import { SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useOrganisation } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useUserDashboard } from '@/services/dashboard';
import { ActionItem } from '@/types/actionItem';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { Image } from '@/components/ui/image';

const I = ENTITY_ICONS;

export default function UserDashboard() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top, bottom } = useSafeAreaInsets();
  const colors = useThemeColors();
  const router = useRouter();
  const { organisation, canAccessAdmin, isLoadingAccess, hydrateFromOrgId } = useOrganisation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-300)).current;
  const {data: dashboard} = useUserDashboard(id || '');

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
    { id: 'announcements', label: 'Announcements', icon: <I.announcement size={24} color={colors.secondary} />, onPress: () => router.push(`/view/announcements/${id}`), color: 'primary' as const },
    { id: 'information', label: 'Information', icon: <I.information size={24} color={colors.secondary} />, onPress: () => router.push(`/view/informations/${id}`), color: 'primary' as const },
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
          <Text style={{ color: secondaryText, fontSize: 14, marginTop: 10 }}>Loading organisation...</Text>
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
                  <Text style={{ fontSize: 18, fontWeight: '700', color: textColor }} numberOfLines={1}>
                    {org?.name || 'Organisation'}
                  </Text>
                  {org?.address ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <I.mapPin size={13} color={secondaryText} />
                      <Text style={{ fontSize: 12, color: secondaryText }} numberOfLines={1}>{org.address}</Text>
                    </View>
                  ) : null}
                </View>
                <View style={{
                  paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
                  backgroundColor: org?.isActive ? success + '15' : danger + '15',
                }}>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: org?.isActive ? success : danger }}>
                    {org?.isActive ? 'Active' : 'Inactive'}
                  </Text>
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
                          <Text style={{ fontSize: 13, fontWeight: '600', color: primary }}>Switch to Admin Mode</Text>
                          <Text style={{ fontSize: 11, color: secondaryText, marginTop: 2 }}>View admin options</Text>
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
          <View>
            <SectionHeader title="Community" />
            <View style={{ backgroundColor: cardBg, borderRadius: 24, paddingVertical: 16, borderWidth: 1, borderColor: border }}>
              <Matrix 
                row={infoLinks} 
                onClose={() => {}} 
                index={0} 
              />
            </View>
          </View>

          <View>
            <SectionHeader title="Services & Info" />
            <View style={{ backgroundColor: cardBg, borderRadius: 24, paddingVertical: 16, borderWidth: 1, borderColor: border }}>
              <Matrix 
                row={communityLinks} 
                onClose={() => {}} 
                index={1} 
              />
            </View>
          </View>

          <View>
            <SectionHeader title="Your activity" />
            
            <DashboardCard 
              title="Bookings" 
              icon={I.booking} 
              labels={['Approved', 'Pending', 'Rejected']}
              values= {[dashboard?.bookings?.approved || 0, dashboard?.bookings?.pending || 0, dashboard?.bookings?.rejected || 0]}
              textColors={[success, primary, danger]}
              backgroundColors={[success + '15', primary + '15', danger + '15']}
              route={`/view/bookings/${id}`}
            />
            
            <DashboardCard 
              title="My Requests" 
              icon={I.userRequest} 
              labels={['Approved', 'Pending', 'Rejected']}
              values= {[dashboard?.requests?.approved || 0, dashboard?.requests?.pending || 0, dashboard?.requests?.rejected || 0]}
              textColors={[success, primary, danger]}
              backgroundColors={[success + '15', primary + '15', danger + '15']}
              route={`/view/user-requests/${id}`}
            />
          </View>

        </ScrollView>
      )}
    </View>
  );
}
