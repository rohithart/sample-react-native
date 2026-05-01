import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useUserRequests } from '@/services/user-request';

export default function UserRequestsListScreen() {
  return (
    <ListScreen
      icon="userRequest"
      title="User Requests"
      config={ADMIN_CONFIGS.userRequest}
      useData={useUserRequests}
      addRoute="/admin/user-request/new"
      emptyMessage="No user requests found"
    />
  );
}
