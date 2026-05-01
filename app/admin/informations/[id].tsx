import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useInformations } from '@/services/information';

export default function InformationsListScreen() {
  return (
    <ListScreen
      icon="information"
      title="Informations"
      config={ADMIN_CONFIGS.information}
      useData={useInformations}
      addRoute="/admin/information/new"
      emptyMessage="No informations found"
    />
  );
}
