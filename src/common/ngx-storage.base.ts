import { NgxStorageResponse } from '../interfaces/ngx-storage-response'

/**
 * Base class for all types of storages
 */
export abstract class NgxStorageBase {
    /**
     * Get value from storage by key
     * @param key - storage key
     */
    public abstract getItem<T>(key: string): NgxStorageResponse<T>;

    /**
     * Set new item into storage by key
     * @param key - storage key
     * @param value - storage value
     */
    public abstract setItem<T>(key: string, value: NgxStorageResponse<T>): boolean;

    /**
     * Delete item from storage by key
     * @param key - storage key
     */
    public abstract deleteItem(key: string): void;

    /**
     * Clear all storage
     */
    public abstract destroyAll(): void;

    /**
     * Checking if has access to the storage
     */
    public abstract isEnabled(): boolean;
}