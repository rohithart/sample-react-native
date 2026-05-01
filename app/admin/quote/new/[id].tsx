import { FormScreen } from '@/components/ui/form-screen';

export default function AddQuoteScreen() {
  return (
    <FormScreen
      icon="quote"
      title="Add New Quote"
      submitLabel="Create Quote"
      successMessage="Quote created successfully"
      getRedirectRoute={(p) => `/admin/quotes/${p.id}`}
    />
  );
}
