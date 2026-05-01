import { FormScreen } from '@/components/ui/form-screen';

export default function EditDocumentScreen() {
  return (
    <FormScreen
      icon="file"
      title="Edit Document"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Document updated successfully"
      initialName="Sample Document"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/document/${p.orgId}/${p.id}`}
    />
  );
}
