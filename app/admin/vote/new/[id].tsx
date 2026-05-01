import { FormScreen } from '@/components/ui/form-screen';

export default function AddVoteScreen() {
  return (
    <FormScreen
      icon="vote"
      title="Add New Vote"
      submitLabel="Create Vote"
      successMessage="Vote created successfully"
      getRedirectRoute={(p) => `/admin/votes/${p.id}`}
    />
  );
}
