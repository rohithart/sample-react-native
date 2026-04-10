import React from 'react';
import { FlatList } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { type Todo } from '@/types/todo';
import { TodoItem } from '@/components/todo-item';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Box className="flex-1 items-center justify-center mt-16">
        <Text size="md" className="text-typography-500">No todos yet. Add one above!</Text>
      </Box>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem todo={item} onToggle={() => onToggle(item.id)} onDelete={() => onDelete(item.id)} />
      )}
      contentContainerClassName="py-2"
      showsVerticalScrollIndicator={false}
    />
  );
}
