import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useMeetings, useArchivedMeetings } from '@/services/meeting';

export default function MeetingsListScreen() {
  return (
    <ListScreen
      icon="meeting"
      title="Meetings"
      config={ADMIN_CONFIGS.meeting}
      useData={useMeetings}
      useArchivedData={useArchivedMeetings}
      addRoute="/admin/meeting/new"
      emptyMessage="No meetings found"
    />
  );
}
