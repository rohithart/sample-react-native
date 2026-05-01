import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { EntityCard } from '@/components/cards/entity-card';
import { DisplaySettingsIndicator } from '@/components/display-settings';
import { PageHeader } from '@/components/ui/page-header';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useDisplaySettings } from '@/context/display-settings-context';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useArchivedWorkflows, useWorkflows } from '@/services/workflow';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { Pressable } from '@/components/ui/pressable';

const I = ENTITY_ICONS;

export default function WorkflowsListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();

  const { showArchived } = useDisplaySettings();
  const workflowsQuery = useWorkflows(id);
  const archivedWorkflowsQuery = useArchivedWorkflows(id);

  const items = showArchived ? archivedWorkflowsQuery.data ?? [] : workflowsQuery.data ?? [];
  const isLoading = showArchived ? archivedWorkflowsQuery.isLoading : workflowsQuery.isLoading;
  const refetching = showArchived ? archivedWorkflowsQuery.isRefetching : workflowsQuery.isRefetching;
  const refreshControl = useRefreshControl(
    showArchived ? archivedWorkflowsQuery.refetch : workflowsQuery.refetch,
    refetching
  );

  const handleAdd = () => {
    router.push(`/admin/workflow/new/${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
        icon="workflow"
        title="Workflows"
        rightAction={
          <Pressable
            onPress={handleAdd}
            style={{ padding: 8, backgroundColor: colors.primary, borderRadius: 8 }}
          >
            <I.plus size={20} color="#ffffff" />
          </Pressable>
        }
      />

      <DisplaySettingsIndicator />

      {isLoading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={items ?? []}
          renderItem={({ item }) => (
            <EntityCard
              item={item}
              config={ADMIN_CONFIGS.workflow}
              orgId={id}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={refreshControl}
          scrollIndicatorInsets={{ right: 1 }}
          ListEmptyComponent={<EmptyState message="No workflows found" />}
        />
      )}
    </SafeAreaView>
  );
}
