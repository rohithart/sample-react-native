import { VIEW_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useBookingsForUser } from '@/services/booking';

export default function BookingsListScreen() {
  return (
    <ListScreen
      icon="booking"
      title="Bookings"
      config={VIEW_CONFIGS.booking}
      useData={useBookingsForUser}
      addRoute="/view/booking/new"
      emptyMessage="No bookings found"
    />
  );
}
