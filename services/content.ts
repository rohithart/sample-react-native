import type { Content } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const contentKeys = {
  blogs: ['content', 'blogs'] as const,
  news: ['content', 'news'] as const,
  detail: (id: string) => ['content', 'detail', id] as const,
};

const contentApi = {
  get: (id: string) => api.get<Content>(`/content/${id}`),
  getAllBlogs: () => api.get<Content[]>('/content/blogs/all'),
  getAllNews: () => api.get<Content[]>('/content/news/all'),
  create: (data: Partial<Content>) => api.post<Content>('/content', data),
  update: (id: string, data: Partial<Content>) => api.put<Content>(`/content/${id}`, data),
  delete: (id: string) => api.delete<boolean>(`/content/${id}`),
};

export function useBlogs() {
  return useQuery({ queryKey: contentKeys.blogs, queryFn: contentApi.getAllBlogs });
}

export function useNews() {
  return useQuery({ queryKey: contentKeys.news, queryFn: contentApi.getAllNews });
}

export function useContent(id: string) {
  return useQuery({ queryKey: contentKeys.detail(id), queryFn: () => contentApi.get(id), enabled: !!id });
}

export function useCreateContent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Content>) => contentApi.create(data), onSuccess: () => { qc.invalidateQueries({ queryKey: contentKeys.blogs }); qc.invalidateQueries({ queryKey: contentKeys.news }); } });
}

export function useDeleteContent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => contentApi.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: contentKeys.blogs }); qc.invalidateQueries({ queryKey: contentKeys.news }); } });
}
