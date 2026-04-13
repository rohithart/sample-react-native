import { useThemeColors } from '@/hooks/use-theme-colors';
import { View } from 'react-native';
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
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: 16,
          borderRadius: 12,
          backgroundColor: skeleton,
          gap: 14,
        },
        style,
      ]}
    >
      {/* Round image placeholder */}
      <LoadingImage size={48} />

      {/* Text lines */}
      <View style={{ flex: 1, gap: 10, paddingTop: 2 }}>
        {/* Title line */}
        <Shimmer style={{ height: 14, borderRadius: 4, width: '80%' }} />
        {/* Subtitle line */}
        <Shimmer style={{ height: 12, borderRadius: 4, width: '60%' }} />
        {/* Meta line */}
        <Shimmer style={{ height: 10, borderRadius: 4, width: '40%' }} />
      </View>
    </View>
  );
}
