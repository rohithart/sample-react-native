import { Organisation } from './Organisation';
import { AssetType } from './AssetType';

export class Asset {
  _id: string;
  title: string;
  description: string;
  archived: boolean;
  isFlagged: boolean;
  flagComment?: string;
  location: string;
  type: string;
  model: string;
  serial: string;
  lifespan: string;
  other: string;
  mfgDate: Date;
  expiryDate: Date;
  createdBy: string;
  updatedBy: string;
  assetType: AssetType;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
