import { FormScreen } from '@/components/ui/form-screen';

export default function AddEventScreen() {
  return (
    <FormScreen
      icon="event"
      title="Add New Event"
      submitLabel="Create Event"
      successMessage="Event created successfully"
      getRedirectRoute={(p) => `/admin/events/${p.id}`}
    />
  );
}
