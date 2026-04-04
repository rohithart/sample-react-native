/**
 * Financial Interfaces - Accounting, budgeting, and financial management
 */

export interface FinancialYear {
  id: string;
  orgId: string;
  name: string;
  startDate: string;
  endDate: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  orgId: string;
  financialYearId: string;
  categoryId: string;
  amount: number;
  spent: number;
  description?: string;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  type: string;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ChartOfAccount {
  id: string;
  orgId: string;
  code: string;
  name: string;
  accountType: string;
  description?: string;
  balance: number;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Status {
  id: string;
  orgId: string;
  name: string;
  entityType: string;
  color?: string;
  order: number;
  isDefault: boolean;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface TransactionEntry {
  id: string;
  orgId: string;
  transactionId: string;
  chartOfAccountId: string;
  amount: number;
  type: 'debit' | 'credit';
  description?: string;
  createdAt: string;
  updatedAt: string;
}
