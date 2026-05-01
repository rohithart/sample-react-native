import { VIEW_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useAnnouncements } from '@/services/announcement';

export default function AnnouncementsListScreen() {
  return (
    <ListScreen
      icon="announcement"
      title="Announcements"
      config={VIEW_CONFIGS.announcement}
      useData={useAnnouncements}
      emptyMessage="No announcements found"
    />
  );
}
