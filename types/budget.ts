export interface Budget {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  financialYearId?: string;
  amount?: number;
  approved?: boolean;
  createdAt: string;
  updatedAt: string;
}
