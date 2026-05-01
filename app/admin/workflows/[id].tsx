import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useWorkflows, useArchivedWorkflows } from '@/services/workflow';

export default function WorkflowsListScreen() {
  return (
    <ListScreen
      icon="workflow"
      title="Workflows"
      config={ADMIN_CONFIGS.workflow}
      useData={useWorkflows}
      useArchivedData={useArchivedWorkflows}
      addRoute="/admin/workflow/new"
      emptyMessage="No workflows found"
    />
  );
}
