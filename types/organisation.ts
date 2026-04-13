export type Organisation = {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  memberCount: number;
  createdAt: string;
};

export type OrgAccess = {
  orgId: string;
  workflows: boolean;
  quotes: boolean;
  invoices: boolean;
  workorders: boolean;
  evidences: boolean;
  vendors: boolean;
  meetings: boolean;
  votes: boolean;
  announcements: boolean;
  bookings: boolean;
  events: boolean;
  assets: boolean;
  documents: boolean;
  budgets: boolean;
  analytics: boolean;
  ai: boolean;
};
