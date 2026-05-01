import { FormScreen } from '@/components/ui/form-screen';

export default function EditReminderScreen() {
  return (
    <FormScreen
      icon="reminder"
      title="Edit Reminder"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Reminder updated successfully"
      initialName="Sample Reminder"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/reminder/${p.orgId}/${p.id}`}
    />
  );
}
