import { FormScreen } from '@/components/ui/form-screen';

export default function EditCategoryScreen() {
  return (
    <FormScreen
      icon="category"
      title="Edit Category"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Category updated successfully"
      initialName="Sample Category"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/category/${p.orgId}/${p.id}`}
    />
  );
}
