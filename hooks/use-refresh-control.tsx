import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { RefreshControl } from 'react-native';

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
