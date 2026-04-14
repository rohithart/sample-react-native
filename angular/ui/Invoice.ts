import { InvoiceStatus } from '../enum';
import { Quote } from './Quote';
import { Organisation } from './Organisation';
import { Workflow } from './Workflow';
import { Workorder } from './Workorder';
import { Vendor } from './Vendor';
import { Transaction } from './Transaction';

export class Invoice {
  _id: string;
  title: string;
  description: string;
  archived: boolean;
  isFlagged: boolean;
  flagComment?: string;
  link?: string;
  totalAmount?: number;
  isExpense: boolean;
  status: InvoiceStatus;
  dueDate?: Date;
  createdBy: string;
  updatedBy: string;
  paidAt?: Date;
  quote?: Quote;
  workorder?: Workorder;
  vendor: Vendor;
  organisation: Organisation;
  workflow?: Workflow;
  transaction?: Transaction;
  createdAt: string;
  updatedAt: string;
}
