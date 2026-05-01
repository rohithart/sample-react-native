import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useVotes, useArchivedVotes } from '@/services/vote';

export default function VotesListScreen() {
  return (
    <ListScreen
      icon="vote"
      title="Votes"
      config={ADMIN_CONFIGS.vote}
      useData={useVotes}
      useArchivedData={useArchivedVotes}
      addRoute="/admin/vote/new"
      emptyMessage="No votes found"
    />
  );
}
