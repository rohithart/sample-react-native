import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useDocuments, useArchivedDocuments } from '@/services/document';

export default function DocumentsListScreen() {
  return (
    <ListScreen
      icon="file"
      title="Documents"
      config={ADMIN_CONFIGS.document}
      useData={useDocuments}
      useArchivedData={useArchivedDocuments}
      addRoute="/admin/document/new"
      emptyMessage="No documents found"
    />
  );
}
