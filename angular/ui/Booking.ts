import { Organisation } from './Organisation';
import { BookingType } from './BookingType';

export class Booking {
  _id: string;
  title: string;
  description: string;
  bookingDateFrom: Date;
  bookingTimeFrom?: Date;
  bookingDateTo?: Date;
  bookingTimeTo?: Date;
  isFullDay: boolean;
  bookingType: BookingType;
  isApproved: boolean;
  approvedBy?: string;
  isRejected: boolean;
  rejectedBy?: string;
  createdBy: string;
  updatedBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
