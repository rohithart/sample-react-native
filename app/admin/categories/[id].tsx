import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useCategorys } from '@/services/category';

export default function CategoriesListScreen() {
  return (
    <ListScreen
      icon="category"
      title="Categories"
      config={ADMIN_CONFIGS.category}
      useData={useCategorys}
      addRoute="/admin/category/new"
      emptyMessage="No categories found"
    />
  );
}
