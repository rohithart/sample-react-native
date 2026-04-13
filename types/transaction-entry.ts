export interface TransactionEntry {
  id: string;
  transactionId: string;
  chartOfAccountId?: string;
  debit?: number;
  credit?: number;
  createdAt: string;
  updatedAt: string;
}
