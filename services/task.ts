import type { Task } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const taskKeys = {
  all: (orgId: string) => ['tasks', orgId] as const,
  forUser: (orgId: string, userId: string) => ['tasks', orgId, 'user', userId] as const,
  archived: (orgId: string) => ['tasks', orgId, 'archived'] as const,
  forWorkflow: (workflowId: string) => ['tasks', 'workflow', workflowId] as const,
  detail: (id: string) => ['tasks', 'detail', id] as const,
};

const taskApi = {
  getAll: (orgId: string) =>
    api.get<Task[]>(`/api/task/org/${orgId}`),

  getAllForUser: (orgId: string, userId: string) =>
    api.get<Task[]>(`/api/task/org/${orgId}/user/${userId}`),

  getAllArchived: (orgId: string) =>
    api.get<Task[]>(`/api/task/org/archived/${orgId}`),

  getAllForWorkflow: (workflowId: string) =>
    api.get<Task[]>(`/api/task/workflow/${workflowId}`),

  get: (id: string) =>
    api.get<Task>(`/api/task/${id}`),

  create: (orgId: string, data: Partial<Task>) =>
    api.post<Task>(`/api/task/${orgId}`, data),

  update: (id: string, data: Partial<Task>) =>
    api.put<Task>(`/api/task/${id}`, data),

  delete: (id: string) =>
    api.delete<boolean>(`/api/task/${id}`),

  updateStatus: (id: string, data: { status: string }) =>
    api.patch<Task>(`/api/task/status/${id}`, data),

  updateUser: (id: string, data: { userId: string }) =>
    api.patch<Task>(`/api/task/user/${id}`, data),

  archive: (id: string) =>
    api.patch<Task>(`/api/task/archive/${id}`, {}),

  unarchive: (id: string) =>
    api.patch<Task>(`/api/task/unarchive/${id}`, {}),

  flag: (id: string, data: { reason: string }) =>
    api.patch<Task>(`/api/task/flag/${id}`, data),

  unflag: (id: string) =>
    api.patch<Task>(`/api/task/unflag/${id}`, {}),
};

export function useTasks(orgId: string) {
  return useQuery({
    queryKey: taskKeys.all(orgId),
    queryFn: () => taskApi.getAll(orgId),
    enabled: !!orgId,
  });
}

export function useTasksForUser(orgId: string, userId: string) {
  return useQuery({
    queryKey: taskKeys.forUser(orgId, userId),
    queryFn: () => taskApi.getAllForUser(orgId, userId),
    enabled: !!orgId && !!userId,
  });
}

export function useArchivedTasks(orgId: string) {
  return useQuery({
    queryKey: taskKeys.archived(orgId),
    queryFn: () => taskApi.getAllArchived(orgId),
    enabled: !!orgId,
  });
}

export function useTasksForWorkflow(workflowId: string) {
  return useQuery({
    queryKey: taskKeys.forWorkflow(workflowId),
    queryFn: () => taskApi.getAllForWorkflow(workflowId),
    enabled: !!workflowId,
  });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => taskApi.get(id),
    enabled: !!id,
  });
}

export function useCreateTask(orgId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Task>) => taskApi.create(orgId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: taskKeys.all(orgId) }),
  });
}

export function useUpdateTask(orgId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => taskApi.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: taskKeys.all(orgId) });
      qc.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
  });
}

export function useDeleteTask(orgId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: taskKeys.all(orgId) }),
  });
}

export function useUpdateTaskStatus(orgId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      taskApi.updateStatus(id, { status }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: taskKeys.all(orgId) });
      qc.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
  });
}

export function useAssignTaskUser(orgId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userId }: { id: string; userId: string }) =>
      taskApi.updateUser(id, { userId }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: taskKeys.all(orgId) });
      qc.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
  });
}

export function useArchiveTask(orgId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskApi.archive(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.all(orgId) });
      qc.invalidateQueries({ queryKey: taskKeys.archived(orgId) });
    },
  });
}

export function useUnarchiveTask(orgId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskApi.unarchive(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.all(orgId) });
      qc.invalidateQueries({ queryKey: taskKeys.archived(orgId) });
    },
  });
}

export function useFlagTask(orgId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      taskApi.flag(id, { reason }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: taskKeys.all(orgId) });
      qc.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
  });
}

export function useUnflagTask(orgId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskApi.unflag(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: taskKeys.all(orgId) });
      qc.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
  });
}
