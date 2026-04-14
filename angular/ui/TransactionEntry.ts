import { Organisation } from './Organisation';
import { FinancialYear } from './FinancialYear';
import { ChartOfAccount } from './ChartOfAccount';
import { Transaction } from './Transaction';

export class TransactionEntry {
  _id: string;
  amount: number;
  archived: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  chartOfAccount: ChartOfAccount;
  financialYear: FinancialYear;
  transaction: Transaction;
  organisation: Organisation;
}
