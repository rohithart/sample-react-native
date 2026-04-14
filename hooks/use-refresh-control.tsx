import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { RefreshControl } from 'react-native';

/**
 * Returns a RefreshControl component wired to a React Query refetch function.
 *
 * Usage:
 * ```tsx
 * const { data, refetch, isRefetching } = useWorkflows(orgId);
 * const refreshControl = useRefreshControl(refetch, isRefetching);
 * <FlatList refreshControl={refreshControl} ... />
 * ```
 */
export function useRefreshControl(refetch: () => void, isRefetching: boolean) {
  const { primary } = useThemeColors();
  return (
    <RefreshControl
      refreshing={isRefetching}
      onRefresh={refetch}
      tintColor={primary}
      colors={[primary]}
    />
  );
}
