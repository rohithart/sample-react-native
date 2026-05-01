import { FormScreen } from '@/components/ui/form-screen';

export default function EditQuoteScreen() {
  return (
    <FormScreen
      icon="quote"
      title="Edit Quote"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Quote updated successfully"
      initialName="Sample Quote"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/quote/${p.orgId}/${p.id}`}
    />
  );
}
