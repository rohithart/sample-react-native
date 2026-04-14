import { Organisation } from './Organisation';

export class OrgAccess {
  _id: string;
  user: boolean;
  workflow: boolean;
  vendor: boolean;
  communication: boolean;
  asset: boolean;
  analytics: boolean;
  ai: boolean;
  finance: boolean;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
