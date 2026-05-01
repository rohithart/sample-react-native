import { FormScreen } from '@/components/ui/form-screen';

export default function EditBookingTypeScreen() {
  return (
    <FormScreen
      icon="bookingType"
      title="Edit Booking Type"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Booking Type updated successfully"
      initialName="Sample Booking Type"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/booking-type/${p.orgId}/${p.id}`}
    />
  );
}
