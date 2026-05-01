import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useBookings } from '@/services/booking';

export default function BookingsListScreen() {
  return (
    <ListScreen
      icon="booking"
      title="Bookings"
      config={ADMIN_CONFIGS.booking}
      useData={useBookings}
      addRoute="/admin/booking/new"
      emptyMessage="No bookings found"
    />
  );
}
