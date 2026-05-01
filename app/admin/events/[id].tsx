import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useEvents } from '@/services/event';

export default function EventsListScreen() {
  return (
    <ListScreen
      icon="event"
      title="Events"
      config={ADMIN_CONFIGS.event}
      useData={useEvents}
      addRoute="/admin/event/new"
      emptyMessage="No events found"
    />
  );
}
