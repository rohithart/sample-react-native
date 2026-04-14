import { AlertFor, AlertType } from '../enum';

export interface Alert {
  _id: string;
  name: string;
  linkName: string;
  link: string;
  alertType: AlertType;
  alertFor: AlertFor;
  active: boolean;
  createdAt: string;
}
