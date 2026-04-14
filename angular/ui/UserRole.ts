import { Role } from '../enum';
import { User } from './User';
import { Organisation } from './Organisation';

export class UserRole {
  _id: string;
  role: Role;
  user: User;
  archived: boolean;
  description?: string;
  reference?: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
