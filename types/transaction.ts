export interface Transaction {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  amount?: number;
  financialYearId?: string;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}
