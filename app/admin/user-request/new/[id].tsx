import { FormScreen } from '@/components/ui/form-screen';

export default function AddUserRequestScreen() {
  return (
    <FormScreen
      icon="userRequest"
      title="Add New User Request"
      submitLabel="Create Request"
      successMessage="User request created successfully"
      getRedirectRoute={(p) => `/admin/user-requests/${p.id}`}
    />
  );
}
