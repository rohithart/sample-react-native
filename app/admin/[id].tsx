import { DashboardCard } from '@/components/cards/dashboard-card';
import { HtmlContent } from '@/components/details';
import { AdminNavigationDrawer } from '@/components/drawer/admin-navigation-drawer';
import { SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useAdminDashboard } from '@/services/dashboard';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, Pressable, Text, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const I = ENTITY_ICONS;

export default function AdminDashboard() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top, bottom } = useSafeAreaInsets();
  const colors = useThemeColors();
  const router = useRouter();
  const { organisation, orgAccess, isLoadingAccess, hydrateFromOrgId } = useOrganisationContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-300)).current;
  const { card, text, isDark } = useThemeColors();
  const {data: dashboard} = useAdminDashboard(id || '');

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

  const { bg: bgColor, text: textColor, sub: secondaryText, primary, secondary, border, card: cardBg, success, danger, warning } = colors;

  const org = organisation;

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
                      <Text style={{ fontSize: 13, fontWeight: '600', color: secondary }}>Switch to User Mode</Text>
                      <Text style={{ fontSize: 11, color: secondaryText, marginTop: 2 }}>View as regular user</Text>
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
                    <Text style={{ fontSize: 12, color: secondaryText }}>{org.timezone}</Text>
                  </View>
                ) : null}
                {org?.identifier ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <I.shield size={13} color={secondaryText} />
                    <Text style={{ fontSize: 12, color: secondaryText }}>{org.identifier}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          {orgAccess && (
            <View style={{ gap: 8 }}>
              <SectionHeader title="Enabled Modules" style={undefined} />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                {(['workflow', 'vendor', 'communication', 'asset', 'finance', 'analytics', 'user', 'ai'] as const).map((mod) => {
                  const enabled = (orgAccess as any)[mod] !== false;
                  return (
                    <View key={mod} style={{
                      paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
                      backgroundColor: enabled ? primary + '12' : secondaryText + '10',
                      borderWidth: 1, borderColor: enabled ? primary + '30' : 'transparent',
                    }}>
                      <Text style={{
                        fontSize: 11, fontWeight: '600', textTransform: 'capitalize',
                        color: enabled ? primary : secondaryText,
                      }}>
                        {mod}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          <View>
            <SectionHeader title="Organisation activity" style={undefined} />

            <DashboardCard 
              title="Workflows" 
              icon={I.booking} 
              labels={['Progress', 'Pending', 'Assigned to you']}
              values= {[dashboard?.workflows?.progress || 0, dashboard?.workflows?.pending || 0, dashboard?.workflows?.assigned || 0]}
              textColors={[success, warning, primary]}
              backgroundColors={[success + '15', warning + '15', primary + '15']}
              route={`/admin/workflows/${id}`}
            />

            <DashboardCard 
              title="Tasks" 
              icon={I.booking} 
              labels={['Progress', 'Pending', 'Assigned to you']}
              values= {[dashboard?.tasks?.progress || 0, dashboard?.tasks?.pending || 0, dashboard?.tasks?.assigned || 0]}
              textColors={[success, warning, primary]}
              backgroundColors={[success + '15', warning + '15', primary + '15']}
              route={`/admin/tasks/${id}`}
            />

            <DashboardCard 
              title="Quotes" 
              icon={I.booking} 
              labels={[ 'Pending']}
              values= {[dashboard?.quotes?.pending || 0]}
              textColors={[warning]}
              backgroundColors={[ warning + '15']}
              route={`/admin/quotes/${id}`}
            />

            <DashboardCard 
              title="Invoices" 
              icon={I.booking} 
              labels={['Overdue',  'Pending', 'Paid']}
              values= {[dashboard?.invoices?.overdue || 0, dashboard?.invoices?.pending || 0, dashboard?.invoices?.paid || 0]}
              textColors={[success, warning, primary]}
              backgroundColors={[success + '15', warning + '15', primary + '15']}
              route={`/admin/invoices/${id}`}
            />
            
            <DashboardCard 
              title="Bookings" 
              icon={I.booking} 
              labels={['Approved', 'Pending', 'Rejected']}
              values= {[dashboard?.bookings?.approved || 0, dashboard?.bookings?.pending || 0, dashboard?.bookings?.rejected || 0]}
              textColors={[success, primary, danger]}
              backgroundColors={[success + '15', primary + '15', danger + '15']}
              route={`/admin/bookings/${id}`}
            />
            
            <DashboardCard 
              title="Requests" 
              icon={I.userRequest} 
              labels={['Approved', 'Pending', 'Rejected']}
              values= {[dashboard?.requests?.approved || 0, dashboard?.requests?.pending || 0, dashboard?.requests?.rejected || 0]}
              textColors={[success, primary, danger]}
              backgroundColors={[success + '15', primary + '15', danger + '15']}
              route={`/admin/user-requests/${id}`}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
