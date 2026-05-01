import { FormScreen } from '@/components/ui/form-screen';

export default function EditMeetingScreen() {
  return (
    <FormScreen
      icon="meeting"
      title="Edit Meeting"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Meeting updated successfully"
      initialName="Sample Meeting"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/meeting/${p.orgId}/${p.id}`}
    />
  );
}
