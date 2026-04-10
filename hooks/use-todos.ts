import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
} from '@/services/todos';
import { type Todo } from '@/types/todo';

export const TODOS_QUERY_KEY = ['todos'] as const;

export function useTodos() {
  return useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: fetchTodos,
  });
}

export function useAddTodo(): UseMutationResult<Todo, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (old = []) => [
        newTodo,
        ...old,
      ]);
    },
  });
}

export function useToggleTodo(): UseMutationResult<Todo, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: TODOS_QUERY_KEY });
      const previous = queryClient.getQueryData<Todo[]>(TODOS_QUERY_KEY);
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (old = []) =>
        old.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      const ctx = context as { previous?: Todo[] } | undefined;
      if (ctx?.previous) {
        queryClient.setQueryData(TODOS_QUERY_KEY, ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}

export function useDeleteTodo(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: TODOS_QUERY_KEY });
      const previous = queryClient.getQueryData<Todo[]>(TODOS_QUERY_KEY);
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (old = []) =>
        old.filter((t) => t.id !== id)
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      const ctx = context as { previous?: Todo[] } | undefined;
      if (ctx?.previous) {
        queryClient.setQueryData(TODOS_QUERY_KEY, ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}

export function useClearCompleted(): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCompleted,
    onSuccess: () => {
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (old = []) =>
        old.filter((t) => !t.completed)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}
