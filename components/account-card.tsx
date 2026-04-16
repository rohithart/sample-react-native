import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { ENTITY_ICONS } from '@/constants/entity-icons';

const I = ENTITY_ICONS;

interface AccountCardProps {
  onPress?: () => void;
}

export function AccountCard({ onPress }: AccountCardProps) {
  const colors = useThemeColors();
  const router = useRouter();
  const { userRole } = useOrganisationContext();

  const userName = userRole?.user?.name || 'John Doe';
  const userEmail = userRole?.user?.email || 'john@example.com';
  const userImage = userRole?.user?.image;

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    router.push('/profile');
  };

  return (
    <Button
      onPress={handlePress}
      className="bg-transparent p-0 mb-4"
    >
      <Box
        className="rounded-lg p-3 w-full"
        style={{ backgroundColor: colors.card }}
      >
        <Box className="flex-row items-center gap-3">
          {userImage ? (
            <Box
              className="w-12 h-12 rounded-full items-center justify-center overflow-hidden"
              style={{ backgroundColor: colors.primary + '20' }}
            >
              <Image
                source={{ uri: userImage }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </Box>
          ) : (
            <Box
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.primary + '20' }}
            >
              <Text className="text-xl">👤</Text>
            </Box>
          )}
          <Box className="flex-1">
            <Text className="font-semibold text-base">{userName}</Text>
            <Text className="text-sm" style={{ color: colors.sub }}>
              {userEmail}
            </Text>
          </Box>
          <I.chevronRight size={20} color={colors.sub} />
        </Box>
      </Box>
    </Button>
  );
}
