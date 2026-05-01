import { FormScreen } from '@/components/ui/form-screen';

export default function AddWorkOrderScreen() {
  return (
    <FormScreen
      icon="workorder"
      title="Add New Work Order"
      submitLabel="Create Work Order"
      successMessage="Work Order created successfully"
      getRedirectRoute={(p) => `/admin/workorders/${p.id}`}
    />
  );
}
