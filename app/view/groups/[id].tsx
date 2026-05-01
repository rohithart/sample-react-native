import { VIEW_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useGroups } from '@/services/group';

export default function GroupsListScreen() {
  return (
    <ListScreen
      icon="group"
      title="Groups"
      config={VIEW_CONFIGS.group}
      useData={useGroups}
      emptyMessage="No groups found"
    />
  );
}
