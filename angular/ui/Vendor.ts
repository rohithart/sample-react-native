import { Organisation } from './Organisation';

export class Vendor {
  _id: string;
  email: string;
  name?: string;
  contactPerson?: string;
  contactNumber?: string;
  address?: string;
  tax?: string;
  ref?: string;
  archived: boolean;
  createdBy: string;
  updatedBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
