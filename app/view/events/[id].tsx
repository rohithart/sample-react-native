import { VIEW_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useEvents } from '@/services/event';

export default function EventsListScreen() {
  return (
    <ListScreen
      icon="event"
      title="Events"
      config={VIEW_CONFIGS.event}
      useData={useEvents}
      emptyMessage="No events found"
    />
  );
}
