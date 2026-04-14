import { EntityType, TimelineCategory } from '../enum';
import { Organisation } from './Organisation';

export class Timeline {
  _id: string;
  entityId: string;
  entityType: EntityType;
  secondaryId?: string;
  secondaryType?: EntityType;
  message: string;
  category: TimelineCategory;
  createdBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
