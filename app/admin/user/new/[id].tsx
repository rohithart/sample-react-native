import { FormScreen } from '@/components/ui/form-screen';

export default function AddUserScreen() {
  return (
    <FormScreen
      icon="user"
      title="Add New User"
      submitLabel="Create User"
      successMessage="User created successfully"
      getRedirectRoute={(p) => `/admin/users/${p.id}`}
    />
  );
}
