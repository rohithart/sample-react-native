import { EntityType, EvidenceStatus } from '../enum';
import { Organisation } from './Organisation';
import { Vendor } from './Vendor';
import { Workflow } from './Workflow';

export class Evidence {
  _id: string;
  title: string;
  description: string;
  organisation: Organisation;
  status: EvidenceStatus;
  forResolution: boolean;
  archived: boolean;
  isFlagged: boolean;
  flagComment?: string;
  entityId?: string;
  entityType?: EntityType;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  vendor?: Vendor;
  workflow?: Workflow;
}
