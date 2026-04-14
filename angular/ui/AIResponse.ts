import { EntityType, AIQuestionType } from '../enum';
import { Organisation } from './Organisation';

export interface AIResponse {
  _id: string;
  questionType: AIQuestionType;
  explanation?: string;
  recommendations: string[];
  callouts: string[];
  entityId: string;
  entityType: EntityType;
  confidenceScore?: number;
  tokens: number;
  createdAt: Date;
  updatedAt?: Date;
  createdBy?: Date;
  processedBy: string;
  organisation: Organisation;
}
