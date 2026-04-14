import { Organisation } from './Organisation';

export class FinancialYear {
  _id: string;
  from: Date;
  to: Date;
  isCurrent: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  organisation: Organisation;
}
