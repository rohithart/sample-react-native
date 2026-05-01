import { FormScreen } from '@/components/ui/form-screen';

export default function AddGroupScreen() {
  return (
    <FormScreen
      icon="group"
      title="Add New Group"
      submitLabel="Create Group"
      successMessage="Group created successfully"
      getRedirectRoute={(p) => `/admin/groups/${p.id}`}
    />
  );
}
