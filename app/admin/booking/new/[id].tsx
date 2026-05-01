import { FormScreen } from '@/components/ui/form-screen';

export default function AddBookingScreen() {
  return (
    <FormScreen
      icon="booking"
      title="Add New Booking"
      submitLabel="Create Booking"
      successMessage="Booking created successfully"
      getRedirectRoute={(p) => `/admin/bookings/${p.id}`}
    />
  );
}
