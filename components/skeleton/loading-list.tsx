import { ScrollView } from '@/components/ui/scroll-view';
import { LoadingCard } from './loading-card';

interface LoadingListProps {
  /** Number of skeleton cards to render. Defaults to 6. */
  count?: number;
  style?: object;
}

/**
 * Renders a scrollable column of `LoadingCard` placeholders.
 * Use this while a list of items is being fetched.
 */
export function LoadingList({ count = 6, style }: LoadingListProps) {
  return (
    <ScrollView
      style={style}
      contentContainerStyle={{ padding: 20, gap: 16 }}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </ScrollView>
  );
}
