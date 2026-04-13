export interface Vendor {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}
