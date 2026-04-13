export interface Booking {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  bookingTypeId?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
