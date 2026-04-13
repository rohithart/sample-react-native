import { useThemeColors } from '@/hooks/use-theme-colors';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoadingImage } from './loading-image';
import { Shimmer } from './shimmer';

/**
 * Full-page skeleton for an item detail screen.
 *
 * Layout mirrors a typical detail page:
 *   ┌─────────────────────────────┐
 *   │   Banner image (full width) │
 *   ├─────────────────────────────┤
 *   │ ◉  Title ────────           │
 *   │     Subtitle ───            │
 *   ├─────────────────────────────┤
 *   │ Body lines (5)              │
 *   │ Tag chips row               │
 *   │ [ Action ] [ Action ]       │
 *   └─────────────────────────────┘
 */
export function LoadingPage() {
  const { bg, separator: dividerColor } = useThemeColors();
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bg }}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    >
      {/* Banner image */}
      <Shimmer
        style={{ width: '100%', height: 220 }}
        borderRadius={0}
      />

      <View style={{ padding: 20, gap: 20 }}>
        {/* Avatar + title block */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <LoadingImage size={64} />
          <View style={{ flex: 1, gap: 10 }}>
            <Shimmer style={{ height: 18, borderRadius: 4, width: '75%' }} />
            <Shimmer style={{ height: 13, borderRadius: 4, width: '50%' }} />
          </View>
        </View>

        {/* Divider */}
        <View style={{ height: 1, backgroundColor: dividerColor }} />

        {/* Body text lines — decreasing widths for a natural paragraph look */}
        <View style={{ gap: 10 }}>
          {[1, 0.95, 0.88, 0.78, 0.6].map((pct, i) => (
            <Shimmer
              key={i}
              style={{ height: 13, borderRadius: 4, width: `${Math.round(pct * 100)}%` }}
            />
          ))}
        </View>

        {/* Divider */}
        <View style={{ height: 1, backgroundColor: dividerColor }} />

        {/* Tag chip row */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Shimmer style={{ height: 28, width: 72, borderRadius: 14 }} />
          <Shimmer style={{ height: 28, width: 56, borderRadius: 14 }} />
          <Shimmer style={{ height: 28, width: 88, borderRadius: 14 }} />
        </View>

        {/* Two equal action buttons */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 4 }}>
          <Shimmer style={{ flex: 1, height: 46, borderRadius: 10 }} />
          <Shimmer style={{ flex: 1, height: 46, borderRadius: 10 }} />
        </View>
      </View>
    </ScrollView>
  );
}
