import { useCallback, useState } from 'react';
import { useUIStore, showNotification } from '@store/index';

interface UseMutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useMutation<T, R = any>(
  mutationFn: (data: T) => Promise<R>,
  options?: UseMutationOptions
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setShowLoading } = useUIStore();

  const mutate = useCallback(
    async (data: T) => {
      try {
        setIsLoading(true);
        setShowLoading(true);
        setError(null);
        const result = await mutationFn(data);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        options?.onError?.(errorMessage);
        showNotification.error(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
        setShowLoading(false);
      }
    },
    [mutationFn, options, setShowLoading]
  );

  return { mutate, isLoading, error };
}
