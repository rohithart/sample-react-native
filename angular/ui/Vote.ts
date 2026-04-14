import { Organisation } from './Organisation';
import { Workflow } from './Workflow';
import { Group } from './Group';

export class Vote {
  _id: string;
  question: string;
  options: string;
  closed: boolean;
  allUsers: boolean;
  endDate?: Date;
  createdBy: string;
  group?: Group;
  workflow?: Workflow;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
