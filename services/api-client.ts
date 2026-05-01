import { ToastConfig } from '@/types/toast';

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

let _accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  _accessToken = token;
}

async function getToken(): Promise<string | null> {
  return _accessToken;
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
