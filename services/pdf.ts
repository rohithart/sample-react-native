import { api } from './api-client';

type PdfEntity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'meeting' | 'document' | 'asset' | 'information' | 'balance-sheet' | 'income-expense';

export const pdfApi = {
  get: (entity: PdfEntity, id: string) => api.get<Blob>(`/pdf/${entity}/${id}`),
};
