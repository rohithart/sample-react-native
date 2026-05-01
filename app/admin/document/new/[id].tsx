import { FormScreen } from '@/components/ui/form-screen';

export default function AddDocumentScreen() {
  return (
    <FormScreen
      icon="file"
      title="Add New Document"
      submitLabel="Create Document"
      successMessage="Document created successfully"
      getRedirectRoute={(p) => `/admin/documents/${p.id}`}
    />
  );
}
