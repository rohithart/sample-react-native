import { FormScreen } from '@/components/ui/form-screen';

export default function EditEvidenceScreen() {
  return (
    <FormScreen
      icon="evidence"
      title="Edit Evidence"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Evidence updated successfully"
      initialName="Sample Evidence"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/evidence/${p.orgId}/${p.id}`}
    />
  );
}
