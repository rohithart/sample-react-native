import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useEventTypes } from '@/services/event-type';

export default function EventTypesListScreen() {
  return (
    <ListScreen
      icon="eventType"
      title="Event Types"
      config={ADMIN_CONFIGS.eventType}
      useData={useEventTypes}
      addRoute="/admin/event-type/new"
      emptyMessage="No event types found"
    />
  );
}
