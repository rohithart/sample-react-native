import { FormScreen } from '@/components/ui/form-screen';

export default function AddAnnouncementScreen() {
  return (
    <FormScreen
      icon="announcement"
      title="Add New Announcement"
      submitLabel="Create Announcement"
      successMessage="Announcement created successfully"
      getRedirectRoute={(p) => `/admin/announcements/${p.id}`}
    />
  );
}
