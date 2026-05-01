import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useEvidences, useArchivedEvidences } from '@/services/evidence';

export default function EvidencesListScreen() {
  return (
    <ListScreen
      icon="evidence"
      title="Evidences"
      config={ADMIN_CONFIGS.evidence}
      useData={useEvidences}
      useArchivedData={useArchivedEvidences}
      addRoute="/admin/evidence/new"
      emptyMessage="No evidences found"
    />
  );
}
