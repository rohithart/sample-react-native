import { EntityType } from '../enum';
import { Organisation } from './Organisation';
import { UserRole } from './UserRole';

export class Comment {
  _id: string;
  comment: string;
  user?: UserRole;
  organisation: Organisation;
  entityId: string;
  entityType: EntityType;
  createdAt: string;
  updatedAt: string;
}
