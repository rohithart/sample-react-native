import { Controller, useForm } from 'react-hook-form';
import { TextInput, useColorScheme } from 'react-native';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

type FormValues = { text: string };

type AddTodoProps = { onAdd: (text: string) => void };

export function AddTodo({ onAdd }: AddTodoProps) {
  const colorScheme = useColorScheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { text: '' } });

  const onSubmit = (data: FormValues) => {
    onAdd(data.text.trim());
    reset();
  };

  return (
    <Box className="mx-4 mt-2 gap-1">
      <Box className="flex-row items-center gap-3 p-4 rounded-xl bg-background-0 shadow-soft-1">
        <Controller
          control={control}
          name="text"
          rules={{ required: 'Enter a todo first' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="flex-1 h-10 px-4 rounded-lg border border-outline-200 bg-background-50"
              style={{ color: colorScheme === 'dark' ? '#FAFAFA' : '#171717' }}
              placeholder="Add a new todo..."
              placeholderTextColor="#A3A3A3"
              value={value}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType="done"
              blurOnSubmit
            />
          )}
        />
        <Button onPress={handleSubmit(onSubmit)} variant="solid" size="md">
          <ButtonText>Add</ButtonText>
        </Button>
      </Box>
      {errors.text && (
        <Text size="xs" className="text-error-500 px-1">
          {errors.text.message}
        </Text>
      )}
    </Box>
  );
}
