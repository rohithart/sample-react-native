import { Organisation } from './Organisation';

export class UserRequest {
  _id: string;
  title: string;
  description: string;
  isApproved: boolean;
  approvedBy?: string;
  isRejected: boolean;
  rejectedBy?: string;
  createdBy: string;
  updatedBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
