export interface Group {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  archived?: boolean;
  memberCount?: number;
  createdAt: string;
  updatedAt: string;
}
