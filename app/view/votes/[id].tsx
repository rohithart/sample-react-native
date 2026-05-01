import { VIEW_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useVotes } from '@/services/vote';

export default function VotesListScreen() {
  return (
    <ListScreen
      icon="vote"
      title="Votes"
      config={VIEW_CONFIGS.vote}
      useData={useVotes}
      emptyMessage="No votes found"
    />
  );
}
