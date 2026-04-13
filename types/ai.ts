export interface AITokenDetails {
  id?: string;
  orgId: string;
  tokensUsed: number;
  tokensRemaining: number;
  period: string;
}

export interface AIContent {
  id?: string;
  content: string;
  entityType: string;
  entityId: string;
}
