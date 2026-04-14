import { ChartOfAccountType } from '../enum';
import { Organisation } from './Organisation';

export class ChartOfAccount {
  _id: string;
  title: string;
  code: string;
  description: string;
  accountType: ChartOfAccountType;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  organisation: Organisation;
}
