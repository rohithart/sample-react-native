import { VIEW_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useMeetings } from '@/services/meeting';

export default function MeetingsListScreen() {
  return (
    <ListScreen
      icon="meeting"
      title="Meetings"
      config={VIEW_CONFIGS.meeting}
      useData={useMeetings}
      emptyMessage="No meetings found"
    />
  );
}
