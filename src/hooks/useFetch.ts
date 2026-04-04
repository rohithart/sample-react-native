import { useState, useEffect, useCallback } from 'react';
import { useUIStore } from '@store/index';

interface UseFetchOptions {
  skip?: boolean;
  refetchInterval?: number;
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  options?: UseFetchOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setShowLoading } = useUIStore();

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      setShowLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setShowLoading(false);
    }
  }, [fetchFn, setShowLoading]);

  useEffect(() => {
    if (options?.skip) return;

    execute();

    if (options?.refetchInterval) {
      const interval = setInterval(execute, options.refetchInterval);
      return () => clearInterval(interval);
    }
  }, [execute, options?.skip, options?.refetchInterval]);

  return { data, isLoading, error, refetch: execute };
}
