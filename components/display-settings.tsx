import { HStack } from '@/components/ui/hstack';
import { useDisplaySettings } from '@/context/display-settings-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SectionHeader } from './section-header';

export function DisplaySettingsIndicator() {
  const router = useRouter();
  const { showArchived, showCompleted } = useDisplaySettings();
  const { card, primary, sub, isDark, success, warning, border } = useThemeColors();

  return (
    <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
      <Pressable
        onPress={() => router.push('/settings')}
        style={({ pressed }) => ({
          backgroundColor: pressed ? (isDark ? '#1f2937' : '#f1f5f9') : card,
          borderRadius: 100,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: border,
        
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.3 : 0.05,
          shadowRadius: 4,
          elevation: 2,
        })}
      >
        <HStack style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <HStack space="xs" style={{ alignItems: 'center', flex: 1 }}>
            <SectionHeader title="Filters" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />

            <View style={{
              paddingVertical: 3,
              paddingHorizontal: 8,
              borderRadius: 12,
              backgroundColor: showArchived ? warning + '15' : 'transparent',
              borderWidth: 1,
              borderColor: showArchived ? warning : 'transparent',
            }}>
              <Text style={{ color: showArchived ? warning : sub, fontSize: 11, fontWeight: '600' }}>
                Archived {showArchived ? '•' : ''}
              </Text>
            </View>

            <View style={{
              paddingVertical: 3,
              paddingHorizontal: 8,
              borderRadius: 12,
              backgroundColor: showCompleted ? success + '15' : 'transparent',
              borderWidth: 1,
              borderColor: showCompleted ? success : 'transparent',
            }}>
              <Text style={{ color: showCompleted ? success : sub, fontSize: 11, fontWeight: '600' }}>
                Completed {showCompleted ? '•' : ''}
              </Text>
            </View>
          </HStack>

          <HStack space="xs" style={{ alignItems: 'center' }}>
             <Text style={{ color: primary, fontSize: 12, fontWeight: '600' }}>Edit</Text>
             <Text style={{ color: primary, fontWeight: '700', fontSize: 16 }}>›</Text>
          </HStack>
        </HStack>
      </Pressable>
    </View>
  );
}
