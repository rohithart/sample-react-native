export interface User {
  id: string;
  orgId?: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  profileImage?: string;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}
