import { WorkflowStatus, WorkFlowPriority } from '../enum';
import { Category } from './Category';
import { Group } from './Group';
import { Organisation } from './Organisation';
import { UserRole } from './UserRole';

export class Workflow {
  _id: string;
  title: string;
  description: string;
  archived: boolean;
  isFlagged: boolean;
  flagComment?: string;
  category: Category;
  status: WorkflowStatus;
  priority: WorkFlowPriority;
  user?: UserRole;
  group?: Group;
  createdBy: string;
  updatedBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
