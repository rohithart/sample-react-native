export interface FinancialYear {
  id: string;
  orgId: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  createdAt: string;
  updatedAt: string;
}
