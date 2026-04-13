export interface Meeting {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  groupId?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}
