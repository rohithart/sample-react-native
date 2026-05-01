import { FormScreen } from '@/components/ui/form-screen';

export default function AddEvidenceScreen() {
  return (
    <FormScreen
      icon="evidence"
      title="Add New Evidence"
      submitLabel="Create Evidence"
      successMessage="Evidence created successfully"
      getRedirectRoute={(p) => `/admin/evidences/${p.id}`}
    />
  );
}
