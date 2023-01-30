import { NgxStorageOptions } from "./ngx-storage-options";
/**
 * NgxStorageResponse
 */
export interface NgxStorageResponse<T> {
    value: T;
    options: NgxStorageOptions;
}