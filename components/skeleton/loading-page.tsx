import { HStack } from '@/components/ui/hstack';
import { ScrollView } from '@/components/ui/scroll-view';
import { View } from '@/components/ui/view';
import { VStack } from '@/components/ui/vstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { LoadingImage } from './loading-image';
import { Shimmer } from './shimmer';

export function LoadingPage() {
  const { bg, separator: dividerColor } = useThemeColors();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bg }}
      contentContainerStyle={{ padding: 20, gap: 16 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    >
      <Shimmer
        style={{ width: '100%', height: 220 }}
        borderRadius={0}
      />

      <VStack space="xl" style={{ padding: 20 }}>
        <HStack space="md" className="items-center">
          <LoadingImage size={64} />
          <VStack space="sm" className="flex-1">
            <Shimmer style={{ height: 18, borderRadius: 4, width: '75%' }} />
            <Shimmer style={{ height: 13, borderRadius: 4, width: '50%' }} />
          </VStack>
        </HStack>

        <View style={{ height: 1, backgroundColor: dividerColor }} />

        <VStack space="sm">
          {[1, 0.95, 0.88, 0.78, 0.6].map((pct, i) => (
            <Shimmer
              key={i}
              style={{ height: 13, borderRadius: 4, width: `${Math.round(pct * 100)}%` }}
            />
          ))}
        </VStack>

        <View style={{ height: 1, backgroundColor: dividerColor }} />

        <HStack space="sm">
          <Shimmer style={{ height: 28, width: 72, borderRadius: 14 }} />
          <Shimmer style={{ height: 28, width: 56, borderRadius: 14 }} />
          <Shimmer style={{ height: 28, width: 88, borderRadius: 14 }} />
        </HStack>

        <HStack space="md" style={{ marginTop: 4 }}>
          <Shimmer style={{ flex: 1, height: 46, borderRadius: 10 }} />
          <Shimmer style={{ flex: 1, height: 46, borderRadius: 10 }} />
        </HStack>
      </VStack>
    </ScrollView>
  );
}
