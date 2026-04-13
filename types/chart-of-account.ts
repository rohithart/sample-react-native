export interface ChartOfAccount {
  id: string;
  orgId: string;
  name: string;
  code?: string;
  type?: string;
  parentId?: string;
  financialYearId?: string;
  createdAt: string;
  updatedAt: string;
}
