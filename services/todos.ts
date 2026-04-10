import { type Todo } from '@/types/todo';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let _todos: Todo[] = [
  {
    id: '1',
    text: 'Learn React Native',
    completed: true,
    createdAt: Date.now() - 100000,
  },
  {
    id: '2',
    text: 'Set up Expo Router',
    completed: true,
    createdAt: Date.now() - 80000,
  },
  {
    id: '3',
    text: 'Add dark mode support',
    completed: false,
    createdAt: Date.now() - 60000,
  },
  {
    id: '4',
    text: 'Integrate React Query',
    completed: false,
    createdAt: Date.now() - 40000,
  },
];

export async function fetchTodos(): Promise<Todo[]> {
  await delay(400);
  return [..._todos];
}

export async function addTodo(text: string): Promise<Todo> {
  await delay(300);
  const todo: Todo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  };
  _todos = [todo, ..._todos];
  return todo;
}

export async function toggleTodo(id: string): Promise<Todo> {
  await delay(200);
  _todos = _todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  const updated = _todos.find((t) => t.id === id);
  if (!updated) throw new Error(`Todo ${id} not found`);
  return updated;
}

export async function deleteTodo(id: string): Promise<void> {
  await delay(200);
  _todos = _todos.filter((t) => t.id !== id);
}

export async function clearCompleted(): Promise<void> {
  await delay(200);
  _todos = _todos.filter((t) => !t.completed);
}
