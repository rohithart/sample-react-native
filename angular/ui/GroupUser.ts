import { Organisation } from './Organisation';
import { Group } from './Group';
import { UserRole } from './UserRole';

export class GroupUser {
  _id: string;
  user: UserRole;
  group: Group;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
