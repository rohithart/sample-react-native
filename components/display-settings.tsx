
import { HStack } from '@/components/ui/hstack';
import { useDisplaySettings } from '@/context/display-settings-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export function DisplaySettingsIndicator() {
  const router = useRouter();
  const { showArchived, showCompleted } = useDisplaySettings();
  const { card, text, primary, sub, isDark, success, warning } = useThemeColors();

  return (
    <View
      style={{
        margin: 10,
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
      onPress={() => router.push('/settings')}
    >
      <HStack className="items-center justify-between">
        <HStack className="items-center" space="md" style={{ flex: 1, minWidth: 0 }}>
          <View
            style={{
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 999,
              backgroundColor: showArchived 
                ? (isDark ? warning + '20' : warning + '10') 
                : (isDark ? '#111827' : '#f8fafc'),
              borderWidth: 1,
              borderColor: showArchived ? warning : (isDark ? '#374151' : '#e2e8f0'),
            }}
          >
            <Text style={{ 
              color: showArchived ? warning : sub, 
              fontSize: 11, 
              fontWeight: '600' 
            }}>
              Archived {showArchived ? 'On' : 'Off'}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 999,
              backgroundColor: showCompleted 
                ? (isDark ? success + '20' : success + '10') 
                : (isDark ? '#111827' : '#f8fafc'),
              borderWidth: 1,
              borderColor: showCompleted ? success : (isDark ? '#374151' : '#e2e8f0'),
            }}
          >
            <Text style={{ 
              color: showCompleted ? success : sub, 
              fontSize: 11, 
              fontWeight: '600' 
            }}>
              Completed {showCompleted ? 'On' : 'Off'}
            </Text>
          </View>
        </HStack>
        <Text style={{ color: primary, fontWeight: '700', fontSize: 18, marginHorizontal: 10 }}>›</Text>
      </HStack>
    </Pressable>
  </View>
  );
}
