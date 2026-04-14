import { WorkorderStatus } from '../enum';
import { Quote } from './Quote';
import { Workflow } from './Workflow';
import { Organisation } from './Organisation';
import { Vendor } from './Vendor';

export class Workorder {
  _id: string;
  title: string;
  description: string;
  archived: boolean;
  isFlagged: boolean;
  flagComment?: string;
  status: WorkorderStatus;
  startDate?: Date;
  endDate?: Date;
  createdBy: string;
  updatedBy: string;
  quote?: Quote;
  vendor: Vendor;
  workflow?: Workflow;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
