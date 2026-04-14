import { EntityType, FileType } from '../enum';
import { Organisation } from './Organisation';
import { UserRole } from './UserRole';
import { Vendor } from './Vendor';

export class File {
  _id: string;
  name: string;
  key: string;
  size: string;
  type: FileType;
  location: string;
  user?: UserRole;
  vendor?: Vendor;
  organisation: Organisation;
  entityId: string;
  entityType: EntityType;
  createdAt: string;
  updatedAt: string;
}
