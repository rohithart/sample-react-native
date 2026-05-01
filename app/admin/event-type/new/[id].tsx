import { FormScreen } from '@/components/ui/form-screen';

export default function AddEventTypeScreen() {
  return (
    <FormScreen
      icon="eventType"
      title="Add New Event Type"
      submitLabel="Create Event Type"
      successMessage="Event Type created successfully"
      getRedirectRoute={(p) => `/admin/event-types/${p.id}`}
    />
  );
}
