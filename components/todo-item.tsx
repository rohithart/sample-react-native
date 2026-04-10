import React from 'react';
import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Check, X } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { type Todo } from '@/types/todo';

cssInterop(Check, { className: { target: 'style', nativeStyleToProp: { color: true } } });
cssInterop(X, { className: { target: 'style', nativeStyleToProp: { color: true } } });

type TodoItemProps = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Pressable onPress={onToggle} className="data-[active=true]:opacity-70">
        <Box className="p-4 mx-4 my-1 rounded-xl bg-background-0 shadow-soft-1">
          <HStack className="w-full items-center">
            <Box
              className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                todo.completed ? 'border-success-500' : 'border-outline-300'
              }`}>
              {todo.completed && (
                <Check size={14} className="text-success-500" />
              )}
            </Box>
            <Text
              className={`flex-1 ml-3 ${
                todo.completed ? 'text-typography-400 line-through' : 'text-typography-900'
              }`}>
              {todo.text}
            </Text>
            <Pressable onPress={onDelete} className="ml-2 p-1 data-[active=true]:opacity-70">
              <X size={16} className="text-error-500" />
            </Pressable>
          </HStack>
        </Box>
      </Pressable>
    </Animated.View>
  );
}
