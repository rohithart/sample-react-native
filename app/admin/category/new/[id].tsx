import { FormScreen } from '@/components/ui/form-screen';

export default function AddCategoryScreen() {
  return (
    <FormScreen
      icon="category"
      title="Add New Category"
      submitLabel="Create Category"
      successMessage="Category created successfully"
      getRedirectRoute={(p) => `/admin/categories/${p.id}`}
    />
  );
}
