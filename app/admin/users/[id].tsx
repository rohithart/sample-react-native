import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useUsers } from '@/services/user';

export default function UsersListScreen() {
  return (
    <ListScreen
      icon="user"
      title="Users"
      config={ADMIN_CONFIGS.user}
      useData={useUsers}
      addRoute="/admin/user/new"
      emptyMessage="No users found"
    />
  );
}
