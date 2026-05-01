import { FormScreen } from '@/components/ui/form-screen';

export default function AddBookingTypeScreen() {
  return (
    <FormScreen
      icon="bookingType"
      title="Add New Booking Type"
      submitLabel="Create Booking Type"
      successMessage="Booking Type created successfully"
      getRedirectRoute={(p) => `/admin/booking-types/${p.id}`}
    />
  );
}
