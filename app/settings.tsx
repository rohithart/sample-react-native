import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { Alert, Switch } from 'react-native';

import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useDisplaySettings } from '@/context/display-settings-context';
import { useTheme } from '@/context/theme-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

export default function SettingsScreen() {
  const { isDark, toggleDarkMode } = useTheme();
  const colors = useThemeColors();
  const I = ENTITY_ICONS;
  const {
    showCompleted,
    setShowCompleted,
    showArchived,
    setShowArchived,
    reload,
  } = useDisplaySettings();

  const handleDarkModeToggle = useCallback(
    (value: boolean) => {
      toggleDarkMode(value);
    },
    [toggleDarkMode]
  );

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
            setShowCompleted(true);
            setShowArchived(false);
            await toggleDarkMode(false);
            reload();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="settings" title="Settings" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 8, alignItems: 'flex-end' }}>
          <Pressable
            onPress={resetSettings}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.danger }}>
              Reset Settings
            </Text>
          </Pressable>
        </View>

        <View style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <I.eye size={20} color={colors.primary} />
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>
              Display
            </Text>
          </View>

          <SettingItem
            icon={<I.eye size={18} color={colors.secondary} />}
            label="Show Completed"
            description="Display completed items in lists"
            value={showCompleted}
            onToggle={setShowCompleted}
            colors={colors}
          />

          <SettingItem
            icon={<I.archive size={18} color={colors.secondary} />}
            label="Show Archived Only"
            description="Display only archived items"
            value={showArchived}
            onToggle={setShowArchived}
            colors={colors}
          />
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            {isDark ? (
              <I.moon size={20} color={colors.primary} />
            ) : (
              <I.sun size={20} color={colors.primary} />
            )}
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>
              App
            </Text>
          </View>

          <SettingItem
            icon={
              isDark ? (
                <I.moon size={18} color={colors.secondary} />
              ) : (
                <I.sun size={18} color={colors.secondary} />
              )
            }
            label="Dark Mode"
            description={isDark ? 'Dark mode is enabled' : 'Light mode is enabled'}
            value={isDark}
            onToggle={handleDarkModeToggle}
            colors={colors}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderRadius: 8,
            backgroundColor: colors.card,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              color: colors.warning,
            }}
          >
            Your preferences are saved automatically
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
            {label}
          </Text>
          <Text style={{ fontSize: 14, color: colors.sub }}>
            {description}
          </Text>
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
