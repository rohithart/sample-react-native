import { EntityType } from '@/enums';
import { api } from './api-client';

import { resolveEntityType } from '@/utils/entity';

export const pdfApi = {
  get: (entity: EntityType, id: string) => api.get<Blob>(`/api/pdf/${resolveEntityType(entity)}/${id}`),
};
