import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { LoadingImage } from './loading-image';
import { Shimmer } from './shimmer';

interface LoadingCardProps {
  style?: object;
}

/**
 * Skeleton placeholder for a list-item card.
 * Layout: round image on the left, three text lines on the right.
 */
export function LoadingCard({ style }: LoadingCardProps) {
  const { skeleton } = useThemeColors();

  return (
    <HStack
      space="md"
      className="items-start"
      style={[{ padding: 16, borderRadius: 12, backgroundColor: skeleton }, style]}
    >
      <LoadingImage size={48} />

      <VStack space="sm" className="flex-1" style={{ paddingTop: 2 }}>
        <Shimmer style={{ height: 14, borderRadius: 4, width: '80%' }} />
        <Shimmer style={{ height: 12, borderRadius: 4, width: '60%' }} />
        <Shimmer style={{ height: 10, borderRadius: 4, width: '40%' }} />
      </VStack>
    </HStack>
  );
}
