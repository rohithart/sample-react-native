import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useAnnouncements } from '@/services/announcement';

export default function AnnouncementsListScreen() {
  return (
    <ListScreen
      icon="announcement"
      title="Announcements"
      config={ADMIN_CONFIGS.announcement}
      useData={useAnnouncements}
      addRoute="/admin/announcement/new"
      emptyMessage="No announcements found"
    />
  );
}
