import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useWorkorders, useArchivedWorkorders } from '@/services/workorder';

export default function WorkordersListScreen() {
  return (
    <ListScreen
      icon="workorder"
      title="Work Orders"
      config={ADMIN_CONFIGS.workorder}
      useData={useWorkorders}
      useArchivedData={useArchivedWorkorders}
      addRoute="/admin/workorder/new"
      emptyMessage="No work orders found"
    />
  );
}
