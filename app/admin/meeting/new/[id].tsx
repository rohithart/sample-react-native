import { FormScreen } from '@/components/ui/form-screen';

export default function AddMeetingScreen() {
  return (
    <FormScreen
      icon="meeting"
      title="Add New Meeting"
      submitLabel="Create Meeting"
      successMessage="Meeting created successfully"
      getRedirectRoute={(p) => `/admin/meetings/${p.id}`}
    />
  );
}
