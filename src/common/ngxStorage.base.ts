import { INgxStorageResponse } from "../interfaces/iNgxStorageResponse"

/**
 * Base class for all types of storages
 */
export abstract class NgxStorageBase {
    /**
     * Get value from storage by key
     * @param key - storage key
     */
    public abstract getItem(key: string): INgxStorageResponse;

    /**
     * Set new item into storage by key
     * @param key - storage key
     * @param value - storage value
     */
    public abstract setItem(key: string, value: INgxStorageResponse): boolean;

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