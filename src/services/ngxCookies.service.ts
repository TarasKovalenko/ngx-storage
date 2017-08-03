import { Injectable } from '@angular/core';

import { NgxStorageBase } from "../common/ngxStorage.base";
import { INgxStorageResponse } from "../interfaces/iNgxStorageResponse";

@Injectable()
export class NgxCookiesService extends NgxStorageBase {
    public getItem(key: string): INgxStorageResponse {
        throw new Error("Method not implemented.");
    }
    public setItem(key: string, value: INgxStorageResponse): boolean {
        throw new Error("Method not implemented.");
    }
    public deleteItem(key: string): void {
        throw new Error("Method not implemented.");
    }
    public destroyAll(): void {
        throw new Error("Method not implemented.");
    }
    public isEnabled(): boolean {
        throw new Error("Method not implemented.");
    }
}