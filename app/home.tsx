import { AddOrganisation } from '@/components/organisations/add-organisation';
import { OrganisationsList } from '@/components/organisations/organisations-list';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useFocusEffect } from 'expo-router';
import { Building2, Menu, PlusCircle } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { Alert, Animated, BackHandler, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeNavigationDrawer } from '@/components/drawer/home-navigation-drawer';

type Tab = 'organisations' | 'add';

const TABS: { key: Tab; label: string; Icon: typeof Building2 }[] = [
  { key: 'organisations', label: 'Organisations', Icon: Building2 },
  { key: 'add', label: 'Add New', Icon: PlusCircle },
];

export default function HomeScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const colors = useThemeColors();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('organisations');
  const drawerAnim = useRef(new Animated.Value(-300)).current;

  const toggleDrawer = useCallback(() => {
    const isOpen = !isDrawerOpen;
    setIsDrawerOpen(isOpen);
    Animated.timing(drawerAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDrawerOpen, drawerAnim]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isDrawerOpen) {
          toggleDrawer();
          return true;
        }
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit the application?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => BackHandler.exitApp(), style: 'destructive' },
          ],
          { cancelable: false }
        );
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [isDrawerOpen, toggleDrawer])
  );

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.bg }}
    >
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: true,
          headerLeft: () => (
            <Button size="md" className="bg-transparent" onPress={toggleDrawer}>
              <Menu size={24} color={colors.icon} />
            </Button>
          ),
        }}
      />

      {/* Navigation Drawer */}
      <HomeNavigationDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        drawerAnim={drawerAnim}
        topInset={top}
      />

      {/* Tab Content */}
      <View style={{ flex: 1 }}>
        {activeTab === 'organisations' ? (
          <OrganisationsList />
        ) : (
          <AddOrganisation onSuccess={() => setActiveTab('organisations')} />
        )}
      </View>

      {/* Bottom Tab Bar */}
      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderTopColor: colors.separator,
          backgroundColor: colors.bg,
          paddingBottom: bottom,
        }}
      >
        {TABS.map(({ key, label, Icon }) => {
          const isActive = activeTab === key;
          const color = isActive ? colors.primary : colors.inactive;

          return (
            <View
              key={key}
              style={{ flex: 1, alignItems: 'center', paddingVertical: 10, gap: 4 }}
              onTouchEnd={() => setActiveTab(key)}
            >
              {isActive && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: 32,
                    height: 3,
                    borderBottomLeftRadius: 3,
                    borderBottomRightRadius: 3,
                    backgroundColor: colors.primary,
                  }}
                />
              )}
              <Icon size={22} color={color} />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: isActive ? '600' : '400',
                  color,
                }}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
