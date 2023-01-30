import { Injectable } from '@angular/core';

import { NgxStorageBase } from "../common/ngx-storage.base";
import { NgxStorageResponse } from "../interfaces/ngx-storage-response";

@Injectable()
export class NgxCookiesService extends NgxStorageBase {
    public deleteItem(key: string): void {
        throw new Error("Method not implemented.");
    }

    public destroyAll(): void {
        throw new Error("Method not implemented.");
    }

    public getItem<T>(key: string): NgxStorageResponse<T> {
        throw new Error("Method not implemented.");
    }

    public isEnabled(): boolean {
        throw new Error("Method not implemented.");
    }

    public setItem<T>(key: string, value: NgxStorageResponse<T>): boolean {
        throw new Error("Method not implemented.");
    }
}