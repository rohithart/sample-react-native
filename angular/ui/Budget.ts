import { Organisation } from './Organisation';
import { FinancialYear } from './FinancialYear';
import { ChartOfAccount } from './ChartOfAccount';

export class Budget {
  _id: string;
  title: string;
  isApproved: boolean;
  amount: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  chartOfAccount: ChartOfAccount;
  financialYear: FinancialYear;
  organisation: Organisation;
}
