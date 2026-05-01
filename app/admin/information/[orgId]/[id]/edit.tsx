import { FormScreen } from '@/components/ui/form-screen';

export default function EditInformationScreen() {
  return (
    <FormScreen
      icon="information"
      title="Edit Information"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Information updated successfully"
      initialName="Sample Information"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/information/${p.orgId}/${p.id}`}
    />
  );
}
