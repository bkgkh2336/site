/**
 * Thin API client for the admin panel.
 * Single place for base URL, credentials, JSON headers and session expiry.
 */
const BASE = '/backend/api.php/api';

export class ApiError extends Error {
    readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

export const isSessionError = (err: unknown): err is ApiError =>
    err instanceof ApiError && err.status === 401;

export interface ApiOptions {
    /** Auto alert+redirect on 401 (default true). Login/verify must disable it. */
    redirectOn401?: boolean;
}

const extractMessage = (text: string, status: number): string => {
    if (text) {
        try {
            const body = JSON.parse(text) as { message?: string; error?: string };
            if (body?.message || body?.error) return body.message || body.error || '';
        } catch {
            /* not JSON — fall through */
        }
        return text;
    }
    return `HTTP ${status}`;
};

const request = async <T>(
    path: string,
    init: RequestInit = {},
    options: ApiOptions = {}
): Promise<T> => {
    const isFormData = init.body instanceof FormData;
    const response = await fetch(`${BASE}/${path}`, {
        credentials: 'include',
        ...init,
        headers: {
            ...(isFormData
                ? {}
                : { 'Content-Type': 'application/json', Accept: 'application/json' }),
            ...(init.headers ?? {})
        }
    });

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        if (response.status === 401 && options.redirectOn401 !== false) {
            alert('Сессия истекла. Пожалуйста, войдите снова.');
            window.location.href = '/manager';
        }
        throw new ApiError(response.status, extractMessage(text, response.status));
    }

    const text = await response.text();
    if (!text) return undefined as T;
    return JSON.parse(text) as T;
};

export const apiGet = <T>(path: string, options?: ApiOptions): Promise<T> =>
    request<T>(path, {}, options);

export const apiPost = <T = void>(path: string, body?: unknown, options?: ApiOptions): Promise<T> =>
    request<T>(
        path,
        {
            method: 'POST',
            body: body === undefined ? undefined : JSON.stringify(body)
        },
        options
    );

export const apiPut = <T = void>(path: string, body: unknown): Promise<T> =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) });

export const apiDelete = async (path: string): Promise<void> => {
    await request(path, { method: 'DELETE' });
};

export const apiUpload = <T>(path: string, form: FormData, options?: ApiOptions): Promise<T> =>
    request<T>(path, { method: 'POST', body: form }, options);
