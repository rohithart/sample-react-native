import { AdminNavigationDrawer } from '@/components/drawer/admin-navigation-drawer';
import { Button } from '@/components/ui/button';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
    BarChart3,
    Bookmark,
    BookOpen,
    CalendarDays,
    ChevronLeft,
    ClipboardList,
    FileText,
    Folder,
    GitBranch,
    Menu,
    Receipt,
    Star,
    ThumbsUp,
    Users,
    Wrench,
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

export default function AdminDashboard() {
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

  const sections: { title: string; cards: DashboardCard[] }[] = [
    {
      title: 'People & Organisation',
      cards: [
        { label: 'Users', icon: <Users size={24} color={primary} />, route: `/admin/users/${id}`, accent: 'primary' },
        { label: 'Groups', icon: <Users size={24} color={secondary} />, route: `/admin/groups/${id}`, accent: 'secondary' },
        { label: 'Analytics', icon: <BarChart3 size={24} color={primary} />, route: `/admin/analytics/${id}`, accent: 'primary' },
      ],
    },
    {
      title: 'Work Management',
      cards: [
        { label: 'Workflows', icon: <GitBranch size={24} color={primary} />, route: `/admin/workflows/${id}`, accent: 'primary' },
        { label: 'Tasks', icon: <ClipboardList size={24} color={secondary} />, route: `/admin/tasks/${id}`, accent: 'secondary' },
        { label: 'Work Orders', icon: <Wrench size={24} color={primary} />, route: `/admin/workorders/${id}`, accent: 'primary' },
      ],
    },
    {
      title: 'Finance',
      cards: [
        { label: 'Quotes', icon: <FileText size={24} color={primary} />, route: `/admin/quotes/${id}`, accent: 'primary' },
        { label: 'Invoices', icon: <Receipt size={24} color={secondary} />, route: `/admin/invoices/${id}`, accent: 'secondary' },
        { label: 'Ledger', icon: <BookOpen size={24} color={primary} />, route: `/admin/ledgers/${id}`, accent: 'primary' },
      ],
    },
    {
      title: 'Communication',
      cards: [
        { label: 'Announcements', icon: <FileText size={24} color={secondary} />, route: `/admin/announcements/${id}`, accent: 'secondary' },
        { label: 'Meetings', icon: <CalendarDays size={24} color={primary} />, route: `/admin/meetings/${id}`, accent: 'primary' },
        { label: 'Votes', icon: <ThumbsUp size={24} color={secondary} />, route: `/admin/votes/${id}`, accent: 'secondary' },
      ],
    },
    {
      title: 'Resources',
      cards: [
        { label: 'Events', icon: <Star size={24} color={primary} />, route: `/admin/events/${id}`, accent: 'primary' },
        { label: 'Bookings', icon: <Bookmark size={24} color={secondary} />, route: `/admin/bookings/${id}`, accent: 'secondary' },
        { label: 'Documents', icon: <Folder size={24} color={primary} />, route: `/admin/documents/${id}`, accent: 'primary' },
      ],
    },
  ];

  return (
    <View
      style={{ flex: 1, backgroundColor: bgColor, paddingBottom: bottom }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Admin',
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

      <AdminNavigationDrawer
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
        {/* Org admin header */}
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
              Admin view · ID {id}
            </RNText>
          </View>
          {/* Member mode link */}
          <Pressable
            onPress={() => router.push(`/view/${id}` as any)}
            style={({ pressed }) => ({
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 8,
              backgroundColor: secondary + '15',
              borderWidth: 1,
              borderColor: secondary,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <RNText style={{ fontSize: 11, fontWeight: '600', color: secondary }}>Member →</RNText>
          </Pressable>
        </View>

        {/* Sectioned cards */}
        {sections.map((section) => (
          <View key={section.title} style={{ gap: 10 }}>
            <RNText
              style={{
                fontSize: 12,
                fontWeight: '600',
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: secondaryText,
              }}
            >
              {section.title}
            </RNText>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {section.cards.map((card) => (
                <Pressable
                  key={card.label}
                  onPress={() => router.push(card.route as any)}
                  style={({ pressed }) => ({
                    flex: 1,
                    padding: 14,
                    borderRadius: 12,
                    backgroundColor: pressed ? pressedColor : (card.accent === 'primary' ? cardPrimaryBg : cardSecondaryBg),
                    gap: 8,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: border,
                  })}
                >
                  {card.icon}
                  <RNText style={{ fontSize: 11, fontWeight: '600', color: textColor, textAlign: 'center' }}>
                    {card.label}
                  </RNText>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
