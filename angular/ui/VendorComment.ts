import { EntityType } from '../enum';
import { Organisation } from './Organisation';
import { UserRole } from './UserRole';
import { Vendor } from './Vendor';

export class VendorComment {
  _id: string;
  comment: string;
  user?: UserRole;
  vendor?: Vendor;
  organisation: Organisation;
  entityId: string;
  entityType: EntityType;
  createdAt: string;
  updatedAt: string;
}
