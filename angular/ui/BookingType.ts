import { Organisation } from './Organisation';

export class BookingType {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  updatedBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
