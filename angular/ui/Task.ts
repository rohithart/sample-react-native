import { TaskStatus } from '../enum';
import { Organisation } from './Organisation';
import { UserRole } from './UserRole';
import { Workflow } from './Workflow';

export class Task {
  _id: string;
  title: string;
  description: string;
  archived: boolean;
  isFlagged: boolean;
  flagComment?: string;
  flag: boolean;
  status: TaskStatus;
  createdBy: string;
  updatedBy: string;
  user: UserRole;
  organisation: Organisation;
  workflow?: Workflow;
  createdAt: string;
  updatedAt: string;
}
