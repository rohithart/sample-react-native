import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddTodo } from '@/components/add-todo';
import { TodoList } from '@/components/todo-list';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import {
  useTodos,
  useAddTodo,
  useToggleTodo,
  useDeleteTodo,
  useClearCompleted,
} from '@/hooks/use-todos';

export default function TodoScreen() {
  const { top } = useSafeAreaInsets();
  const { data: todos = [], isLoading } = useTodos();
  const addTodoMutation = useAddTodo();
  const toggleTodoMutation = useToggleTodo();
  const deleteTodoMutation = useDeleteTodo();
  const clearCompletedMutation = useClearCompleted();

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-typography-500">Loading todos...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'My Todos' }} />

      <Box style={{ paddingTop: top + 24 }} className="pb-4 px-6 items-center gap-1 border-b border-outline-100">
        <Text className="text-3xl font-bold text-typography-900">Todo List</Text>
        {totalCount > 0 && (
          <Text size="sm" className="text-typography-400">
            {completedCount} of {totalCount} completed
          </Text>
        )}
      </Box>

      <AddTodo onAdd={(text) => addTodoMutation.mutate(text)} />
      <TodoList
        todos={todos}
        onToggle={(id) => toggleTodoMutation.mutate(id)}
        onDelete={(id) => deleteTodoMutation.mutate(id)}
      />

      {completedCount > 0 && (
        <Box className="px-4 pb-6 pt-2">
          <Button
            variant="outline"
            action="negative"
            size="md"
            className="w-full"
            onPress={() => clearCompletedMutation.mutate()}>
            <ButtonText>Clear {completedCount} completed</ButtonText>
          </Button>
        </Box>
      )}
    </View>
  );
}
