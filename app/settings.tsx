import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Switch,
  Text as RNText,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/context/theme-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Archive, ChevronLeft, Eye, Moon, Sun } from 'lucide-react-native';

const DISPLAY_SETTINGS_KEY = '@app_display_settings';

const DEFAULT_DISPLAY_SETTINGS = {
  showCompleted: true,
  showArchived: false,
};

export default function SettingsScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { isDark, toggleDarkMode } = useTheme();
  const colors = useThemeColors();
  const router = useRouter();

  // Display settings only
  const [showCompleted, setShowCompleted] = useState(DEFAULT_DISPLAY_SETTINGS.showCompleted);
  const [showArchived, setShowArchived] = useState(DEFAULT_DISPLAY_SETTINGS.showArchived);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Save display settings whenever they change
  useEffect(() => {
    saveSettings();
  }, [showCompleted, showArchived]);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem(DISPLAY_SETTINGS_KEY);
      if (saved) {
        const settings = JSON.parse(saved);
        setShowCompleted(settings.showCompleted ?? DEFAULT_DISPLAY_SETTINGS.showCompleted);
        setShowArchived(settings.showArchived ?? DEFAULT_DISPLAY_SETTINGS.showArchived);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        showCompleted,
        showArchived,
      };
      await AsyncStorage.setItem(DISPLAY_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const resetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: async () => {
            setShowCompleted(DEFAULT_DISPLAY_SETTINGS.showCompleted);
            setShowArchived(DEFAULT_DISPLAY_SETTINGS.showArchived);
            await toggleDarkMode(false); // Reset dark mode to off
            try {
              await AsyncStorage.removeItem(DISPLAY_SETTINGS_KEY);
            } catch (error) {
              console.error('Error resetting settings:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleDarkModeToggle = useCallback(
    (value: boolean) => {
      toggleDarkMode(value);
    },
    [toggleDarkMode]
  );

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.bg, paddingTop: top, paddingBottom: bottom }}
    >
      <Stack.Screen
        options={{
          title: 'Settings',
          headerShown: true,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                paddingHorizontal: 8,
              })}
            >
              <ChevronLeft size={24} color={colors.text} />
            </Pressable>
          ),
          headerTintColor: colors.text,
          headerTitleStyle: {
            color: colors.text,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: colors.bg,
          },
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Reset Settings Button */}
        <View style={{ marginBottom: 24, alignItems: 'flex-end' }}>
          <Pressable
            onPress={resetSettings}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <RNText style={{ fontSize: 14, fontWeight: '600', color: colors.danger }}>
              Reset Settings
            </RNText>
          </Pressable>
        </View>

        {/* Display Section */}
        <View style={{ marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Eye size={20} color={colors.primary} />
            <RNText style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>
              Display
            </RNText>
          </View>

          {/* Show Completed Toggle */}
          <SettingItem
            icon={<Eye size={18} color={colors.secondary} />}
            label="Show Completed"
            description="Display completed items in lists"
            value={showCompleted}
            onToggle={setShowCompleted}
            colors={colors}
          />

          {/* Show Archived Toggle */}
          <SettingItem
            icon={<Archive size={18} color={colors.secondary} />}
            label="Show Archived Only"
            description="Display only archived items"
            value={showArchived}
            onToggle={setShowArchived}
            colors={colors}
          />
        </View>

        {/* App Section */}
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            {isDark ? (
              <Moon size={20} color={colors.primary} />
            ) : (
              <Sun size={20} color={colors.primary} />
            )}
            <RNText style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>
              App
            </RNText>
          </View>

          {/* Dark Mode Toggle */}
          <SettingItem
            icon={
              isDark ? (
                <Moon size={18} color={colors.secondary} />
              ) : (
                <Sun size={18} color={colors.secondary} />
              )
            }
            label="Dark Mode"
            description={isDark ? 'Dark mode is enabled' : 'Light mode is enabled'}
            value={isDark}
            onToggle={handleDarkModeToggle}
            colors={colors}
          />
        </View>

        {/* Settings Info */}
        <View
          style={{
            marginTop: 48,
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderRadius: 8,
            backgroundColor: colors.card,
          }}
        >
          <RNText
            style={{
              fontSize: 14,
              textAlign: 'center',
              color: colors.sub,
            }}
          >
            Your preferences are saved automatically
          </RNText>
        </View>
      </ScrollView>
    </View>
  );
}

function SettingItem({
  icon,
  label,
  description,
  value,
  onToggle,
  colors,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  colors: import('@/hooks/use-theme-colors').ThemeColors;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: colors.card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
        <View>{icon}</View>
        <View style={{ flex: 1 }}>
          <RNText style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
            {label}
          </RNText>
          <RNText style={{ fontSize: 14, color: colors.sub }}>
            {description}
          </RNText>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{
          false: colors.switchTrack,
          true: colors.primary,
        }}
        thumbColor={value ? colors.switchThumbActive : colors.switchThumb}
        style={{ marginLeft: 12 }}
      />
    </View>
  );
}
