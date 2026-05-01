import { FormScreen } from '@/components/ui/form-screen';

export default function AddInformationScreen() {
  return (
    <FormScreen
      icon="information"
      title="Add New Information"
      submitLabel="Create Information"
      successMessage="Information created successfully"
      getRedirectRoute={(p) => `/admin/informations/${p.id}`}
    />
  );
}
