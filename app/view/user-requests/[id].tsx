import { VIEW_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useUserRequests } from '@/services/user-request';

export default function MyRequestsListScreen() {
  return (
    <ListScreen
      icon="userRequest"
      title="Your Requests"
      config={VIEW_CONFIGS.userRequest}
      useData={useUserRequests}
      addRoute="/view/user-request/new"
      emptyMessage="No user requests found"
    />
  );
}
