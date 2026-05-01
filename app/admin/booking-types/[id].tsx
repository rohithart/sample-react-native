import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useBookingTypes } from '@/services/booking-type';

export default function BookingTypesListScreen() {
  return (
    <ListScreen
      icon="bookingType"
      title="Booking Types"
      config={ADMIN_CONFIGS.bookingType}
      useData={useBookingTypes}
      addRoute="/admin/booking-type/new"
      emptyMessage="No booking types found"
    />
  );
}
