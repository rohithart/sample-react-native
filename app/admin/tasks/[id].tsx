import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useTasks, useArchivedTasks } from '@/services/task';

export default function TasksListScreen() {
  return (
    <ListScreen
      icon="task"
      title="Tasks"
      config={ADMIN_CONFIGS.task}
      useData={useTasks}
      useArchivedData={useArchivedTasks}
      addRoute="/admin/task/new"
      emptyMessage="No tasks found"
    />
  );
}
