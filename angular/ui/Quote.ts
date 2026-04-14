import { QuoteStatus } from '../enum';
import { Organisation } from './Organisation';
import { Vendor } from './Vendor';
import { Workflow } from './Workflow';

export class Quote {
  _id: string;
  title: string;
  description: string;
  archived: boolean;
  isFlagged: boolean;
  flagComment?: string;
  vendorDescription?: string;
  budget?: number;
  amount?: number;
  status: QuoteStatus;
  accessTokenHash?: string;
  accessTokenExpiry?: Date;
  submittedAt?: Date;
  createdBy: string;
  updatedBy: string;
  approvedAt?: Date;
  approvedBy?: string;
  vendor: Vendor;
  organisation: Organisation;
  workflow?: Workflow;
  createdAt: string;
  updatedAt: string;
}
