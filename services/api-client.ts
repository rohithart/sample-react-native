import { ToastConfig } from '@/types/toast';
import { Platform } from 'react-native';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';

let toastHandler: ((payload: ToastConfig) => void) | null = null;
export function registerToastHandler(fn: (payload: ToastConfig) => void) { toastHandler = fn; }
export function unregisterToastHandler() { toastHandler = null; }

function showApiToast(status: number, message: string) {
  if (!toastHandler) return;

  let title: string;

  switch (status) {
    case 400: title = 'Bad Request'; break;
    case 401: title = 'Unauthorised'; break;
    case 403: title = 'Access Denied'; break;
    case 404: title = 'Not Found'; break;
    case 409: title = 'Conflict'; break;
    case 422: title = 'Validation Error'; break;
    case 429: title = 'Too Many Requests'; break;
    case 500: title = 'Server Error'; break;
    case 502: title = 'Bad Gateway'; break;
    case 503: title = 'Service Unavailable'; break;
    default: title = status >= 500 ? 'Server Error' : 'Request Failed'; break;
  }

  toastHandler({ type: 'error', title, message, duration: 4500 });
}

async function getToken(): Promise<string | null> {
  if (Platform.OS === 'web') return null;
  return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldVZmlDMzZ1QmJHN2tXQUE5QU1GWiJ9.eyJodHRwczovL3Byb3BvcmRvLmNvbS9lbWFpbCI6InJvaGl0aGFydEB5YWhvby5jb20iLCJodHRwczovL3Byb3BvcmRvLmNvbS9yb2xlIjpbIlN1cGVyQWRtaW4iXSwiaHR0cHM6Ly9wcm9wb3Jkby5jb20vbWV0YV9kYXRhIjp7fSwiaXNzIjoiaHR0cHM6Ly9hdXRoLnByb3BvcmRvLmNvbS8iLCJzdWIiOiJhdXRoMHw2OTJlOTVlZTVlZTJhZDE0MjZkM2EyYWMiLCJhdWQiOlsiaHR0cHM6Ly9wcm9wb3Jkby5hdS5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vcHJvcG9yZG8uYXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTc3Njc1ODUyMiwiZXhwIjoxNzc2ODQ0OTIyLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwiYXpwIjoiM1hnYWpwcXV1UmJ3d0YyeFp5UW9HREcxSUxQU1lITnMifQ.XnJT3lVb2fS9SMXM1BBcu_n-HlLo8cHkaUHpPa-hzgDt3QKrVZX9xI9jX9bl9cAtMy35utw3d9vAsVmb45r1tlju_NgCcB-ADArvC7fSP3pmi0IirdDu0U7Se8ZihywPqtliQm7DGW7bA5Ot1A3UHDclb1lfn4Pr8oU_8vHQWEI41uCvcQbVQDByEUg-YSdUIbGYBygarYGTwq_bfnroNMNKHiHJ2AbFXnuWOQn73-XAsFSP6lg0wXr1RDK0MNQkevqoyDiBnyh4nUrXEWSTPSOPlM2-gQ9bBgCeYa8qSzUVjGisHpMQNguWFOtup-IfcfujYFAtScHCGLJAOQHGRw';
  // return SecureStore.getItemAsync('auth_token');
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const url = `${BASE_URL}${path}`;
  if (__DEV__) console.log('[api] request', { url, method: options.method ?? 'GET', token: !!token });

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    let message = `Request failed with status ${res.status}`;
    try {
      const json = JSON.parse(body);
      message = json.message || json.error || message;
    } catch {
      if (body) message = body;
    }
    const error = new ApiError(res.status, message);
    showApiToast(res.status, message);
    throw error;
  }

  if (res.status === 204) return null as T;

  try {
    return await res.json();
  } catch (e) {
    if (e instanceof SyntaxError) {
      return undefined as T;
    }
    throw e;
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),

  post: <T>(path: string, data?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: data != null ? JSON.stringify(data) : undefined,
    }),

  put: <T>(path: string, data?: unknown) =>
    request<T>(path, {
      method: 'PUT',
      body: data != null ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(path: string, data?: unknown) =>
    request<T>(path, {
      method: 'PATCH',
      body: data != null ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(path: string) =>
    request<T>(path, { method: 'DELETE' }),
};
