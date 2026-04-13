import { UserNavigationDrawer } from '@/components/drawer/user-navigation-drawer';
import { Button } from '@/components/ui/button';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
    Bookmark,
    CalendarDays,
    ChevronLeft,
    FileText,
    Info,
    Menu,
    Radio,
    Shield,
    Star,
    ThumbsUp,
    Users,
} from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text as RNText, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DashboardCard = {
  label: string;
  icon: React.ReactNode;
  route: string;
  accent: 'primary' | 'secondary';
};

export default function UserDashboard() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top, bottom } = useSafeAreaInsets();
  const colors = useThemeColors();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-300)).current;

  const toggleDrawer = useCallback(() => {
    const next = !isDrawerOpen;
    setIsDrawerOpen(next);
    Animated.timing(drawerAnim, {
      toValue: next ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDrawerOpen, drawerAnim]);

  const { bg: bgColor, text: textColor, sub: secondaryText, card: cardBg, primary, secondary, pressed: pressedColor, border, cardPrimaryBg, cardSecondaryBg } = colors;

  const cards: DashboardCard[] = [
    { label: 'Announcements', icon: <FileText size={26} color={primary} />, route: `/view/announcements/${id}`, accent: 'primary' },
    { label: 'Meetings', icon: <CalendarDays size={26} color={secondary} />, route: `/view/meetings/${id}`, accent: 'secondary' },
    { label: 'Votes', icon: <ThumbsUp size={26} color={primary} />, route: `/view/votes/${id}`, accent: 'primary' },
    { label: 'Information', icon: <Info size={26} color={secondary} />, route: `/view/informations/${id}`, accent: 'secondary' },
    { label: 'Events', icon: <Star size={26} color={primary} />, route: `/view/events/${id}`, accent: 'primary' },
    { label: 'Bookings', icon: <Bookmark size={26} color={secondary} />, route: `/view/bookings/${id}`, accent: 'secondary' },
    { label: 'Groups', icon: <Users size={26} color={primary} />, route: `/view/groups/${id}`, accent: 'primary' },
    { label: 'Wall', icon: <Radio size={26} color={secondary} />, route: `/view/wall/${id}`, accent: 'secondary' },
    { label: 'My Requests', icon: <FileText size={26} color={primary} />, route: `/view/user-requests/${id}`, accent: 'primary' },
    { label: 'Security', icon: <Shield size={26} color={secondary} />, route: `/view/admins/${id}`, accent: 'secondary' },
  ];

  return (
    <View
      style={{ flex: 1, backgroundColor: bgColor, paddingBottom: bottom }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Dashboard',
          headerLeft: () => (
            <Button size="md" className="bg-transparent" onPress={toggleDrawer}>
              <Menu size={24} color={textColor} />
            </Button>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                paddingHorizontal: 8,
              })}
            >
              <ChevronLeft size={24} color={textColor} />
            </Pressable>
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

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20, gap: 20 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isDrawerOpen}
      >
        {/* Org header */}
        <View
          style={{
            padding: 16,
            borderRadius: 14,
            backgroundColor: primary + '15',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: primary + '25',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RNText style={{ fontSize: 20, fontWeight: '700', color: primary }}>
              {id?.toString().charAt(0).toUpperCase()}
            </RNText>
          </View>
          <View style={{ flex: 1 }}>
            <RNText style={{ fontSize: 16, fontWeight: '700', color: textColor }}>
              Organisation
            </RNText>
            <RNText style={{ fontSize: 12, color: secondaryText, marginTop: 2 }}>
              Member view · ID {id}
            </RNText>
          </View>
          {/* Admin mode link */}
          <Pressable
            onPress={() => router.push(`/admin/${id}` as any)}
            style={({ pressed }) => ({
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 8,
              backgroundColor: primary + '15',
              borderWidth: 1,
              borderColor: primary,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <RNText style={{ fontSize: 11, fontWeight: '600', color: primary }}>Admin →</RNText>
          </Pressable>
        </View>

        {/* Section label */}
        <RNText style={{ fontSize: 13, fontWeight: '600', color: secondaryText, letterSpacing: 0.6, textTransform: 'uppercase' }}>
          Quick Access
        </RNText>

        {/* 2-column card grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {cards.map((card) => (
            <Pressable
              key={card.label}
              onPress={() => router.push(card.route as any)}
              style={({ pressed }) => ({
                width: '47%',
                padding: 16,
                borderRadius: 14,
                backgroundColor: pressed ? pressedColor : (card.accent === 'primary' ? cardPrimaryBg : cardSecondaryBg),
                gap: 10,
                borderWidth: 1,
                borderColor: border,
              })}
            >
              {card.icon}
              <RNText style={{ fontSize: 13, fontWeight: '600', color: textColor }}>
                {card.label}
              </RNText>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
