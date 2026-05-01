import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useReminders } from '@/services/reminder';

export default function RemindersListScreen() {
  return (
    <ListScreen
      icon="reminder"
      title="Reminders"
      config={ADMIN_CONFIGS.reminder}
      useData={useReminders}
      addRoute="/admin/reminder/new"
      emptyMessage="No reminders found"
    />
  );
}
