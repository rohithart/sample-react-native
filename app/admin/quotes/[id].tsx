import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useQuotes, useArchivedQuotes } from '@/services/quote';

export default function QuotesListScreen() {
  return (
    <ListScreen
      icon="quote"
      title="Quotes"
      config={ADMIN_CONFIGS.quote}
      useData={useQuotes}
      useArchivedData={useArchivedQuotes}
      addRoute="/admin/quote/new"
      emptyMessage="No quotes found"
    />
  );
}
