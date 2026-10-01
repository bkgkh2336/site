import { useCallback, useEffect, useState } from 'react';
import { apiGet, apiPost, apiPut, apiDelete, isSessionError } from './api';

type Row = { id?: number };

/**
 * Shared CRUD state machine for admin panels: list loading, editing record,
 * save/delete flags and API-backed mutations. Panels keep only their own
 * validation and rendering on top of this.
 */
export function useCrud<T extends Row>(resource: string, loadErrorMessage: string) {
    const [items, setItems] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editing, setEditing] = useState<T | null>(null);

    const load = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await apiGet<T[]>(resource);
            setItems(Array.isArray(data) ? data : []);
            setError('');
        } catch (err) {
            if (!isSessionError(err)) {
                console.error('Load error:', err);
                setError(loadErrorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    }, [resource, loadErrorMessage]);

    useEffect(() => {
        void load();
    }, [load]);

    /**
     * Persists payload via POST (new) or PUT (existing), merges the result
     * into the list. Returns the server response (e.g. { id }) or null on
     * error — so callers check `if (saved)`.
     */
    const save = useCallback(
        async (payload: Record<string, unknown>, original: T | null, isNew: boolean) => {
            setIsSaving(true);
            try {
                const response = isNew
                    ? await apiPost<Record<string, unknown> | undefined>(resource, payload)
                    : await apiPut<Record<string, unknown> | undefined>(
                          `${resource}/${original?.id}`,
                          payload
                      );
                const respId = response?.id as number | undefined;
                const saved = {
                    ...(original as T),
                    ...payload,
                    id: isNew ? respId ?? original?.id : original?.id
                } as T;
                setItems(prev =>
                    isNew
                        ? [...prev, saved]
                        : prev.map(item => (item.id === original?.id ? saved : item))
                );
                return response ?? {};
            } catch (err) {
                if (!isSessionError(err)) {
                    console.error('Save error:', err);
                    alert(`Ошибка сохранения: ${err instanceof Error ? err.message : err}`);
                }
                return null;
            } finally {
                setIsSaving(false);
            }
        },
        [resource]
    );

    /**
     * Deletes the record (with optional confirm dialog), removes it from the
     * list and closes the editor when it was open on this record.
     */
    const remove = useCallback(
        async (item: T, confirmText?: string) => {
            if (confirmText && !window.confirm(confirmText)) return false;
            setIsDeleting(true);
            try {
                await apiDelete(`${resource}/${item.id}`);
                setItems(prev => prev.filter(row => row.id !== item.id));
                setEditing(prev => (prev?.id === item.id ? null : prev));
                return true;
            } catch (err) {
                if (!isSessionError(err)) {
                    console.error('Delete error:', err);
                    alert('Ошибка при удалении');
                }
                return false;
            } finally {
                setIsDeleting(false);
            }
        },
        [resource]
    );

    return {
        items,
        setItems,
        editing,
        setEditing,
        isLoading,
        error,
        isSaving,
        isDeleting,
        load,
        save,
        remove
    };
}
