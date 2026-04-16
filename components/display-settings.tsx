
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useThemeColors } from '@/hooks/use-theme-colors';

export function DisplaySettingsIndicator() {
  const router = useRouter();
  const { showArchived, showCompleted } = useDisplaySettings();
  const { card, text, sub, border, pressed, primary } = useThemeColors();

  return (
    <Pressable
      onPress={() => router.push('/settings')}
      style={({ pressed: isPressed }) => ({
        marginHorizontal: 14,
        marginTop: 10,
        borderRadius: 12,
        padding: 10,
        backgroundColor: isPressed ? pressed : card,
        borderWidth: 1,
        borderColor: border,
        shadowColor: text,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 4,
      })}
    >
      <VStack space="xs">
        <HStack className="items-center justify-between">
          <Text style={{ fontWeight: '600', color: text, fontSize: 15 }}>Display Settings</Text>
          <Text style={{ color: primary, fontSize: 13 }}>Edit</Text>
        </HStack>
        <HStack className="items-center" space="md">
          <Text style={{ color: sub, fontSize: 13 }}>Show Archived:</Text>
          <Text style={{ color: text, fontWeight: '500', fontSize: 13 }}>{showArchived ? 'On' : 'Off'}</Text>
        </HStack>
        <HStack className="items-center" space="md">
          <Text style={{ color: sub, fontSize: 13 }}>Show Completed:</Text>
          <Text style={{ color: text, fontWeight: '500', fontSize: 13 }}>{showCompleted ? 'On' : 'Off'}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
}
