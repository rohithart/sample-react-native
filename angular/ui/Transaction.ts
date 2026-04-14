import { Organisation } from './Organisation';
import { FinancialYear } from './FinancialYear';

export class Transaction {
  _id: string;
  description: string;
  isExpense: boolean;
  isPending: boolean;
  amount: number;
  txnDate: Date;
  archived: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  financialYear: FinancialYear;
  organisation: Organisation;
}
