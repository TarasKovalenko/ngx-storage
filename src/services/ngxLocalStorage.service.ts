import { Injectable } from '@angular/core';

import { NgxStorageBase } from "../common/ngx-storage.base";
import { NgxStorageResponse } from "../interfaces/ngx-storage-response";

@Injectable()
export class NgxLocalStorageService extends NgxStorageBase {

    /**
     * Get value from localStorage by key
     * @param key - storage key
     * @return INgxStorageResponse or null if not found
     */
    public getItem<T>(key: string): NgxStorageResponse<T> {
        let value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    /**
     * Set new item into localStorage by key
     * @param key - storage key
     * @param value - storage value
     * @return Boolean true - success, false - something happened (see into browser developer console)
     */
    public setItem<T>(key: string, value: NgxStorageResponse<T>): boolean {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn(e.message);
            return false;
        }
    }

    /**
     * Delete item from localStorage by key
     * @param key - storage key
     * @return void
     */
    public deleteItem(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * Clear all localStorage
     * @return void
     */
    public destroyAll(): void {
        localStorage.clear();
    }

    /**
     * Checking if has access to the localStorage
     * @return Boolean true - have access, false - don't have access (see into browser developer console)
     */
    public isEnabled(): boolean {
        try {
            localStorage.setItem('ngxTestKey', 'ngxTestValue');
            localStorage.removeItem('ngxTestKey');
            return true;
        } catch (e) {
            console.warn(e.message);
            return false;
        }
    }
}