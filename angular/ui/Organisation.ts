export class Organisation {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  isArchived: boolean;
  description: string;
  timezone: string;
  financialYearMonth: Number;
  identifier?: string;
  address?: string;
  isOnboarding: boolean;
  onboardingCode?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
