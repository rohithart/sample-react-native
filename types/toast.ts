export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastConfig = {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
};