import { FormScreen } from '@/components/ui/form-screen';

export default function EditEventTypeScreen() {
  return (
    <FormScreen
      icon="eventType"
      title="Edit Event Type"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Event Type updated successfully"
      initialName="Sample Event Type"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/event-type/${p.orgId}/${p.id}`}
    />
  );
}
