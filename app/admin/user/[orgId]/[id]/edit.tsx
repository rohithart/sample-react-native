import { FormScreen } from '@/components/ui/form-screen';

export default function EditUserScreen() {
  return (
    <FormScreen
      icon="user"
      title="Edit User"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="User updated successfully"
      initialName="Sample User"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/user/${p.orgId}/${p.id}`}
    />
  );
}
