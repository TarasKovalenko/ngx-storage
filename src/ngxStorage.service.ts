import { Injectable, Optional } from '@angular/core';

import { NgxStorageOptions } from "./interfaces/ngx-storage-options";
import { NgxStorageResponse } from "./interfaces/ngx-storage-response";

import { NgxStorageBase } from "./common/ngx-storage.base";

import { NgxLocalStorageService } from "./services/ngxLocalStorage.service";
import { NgxSessionStorageService } from "./services/ngxSessionStorage.service";
import { NgxCookiesService } from "./services/ngxCookies.service";

const NGX_PREFIX = "_ngx";

@Injectable()
export class NgxStorageService {

    private ngxPrefix: string = NGX_PREFIX;

    /**
     * Instance with default option settings
     */
    private defaultNgxOptions: NgxStorageOptions = {
        lifeTime: Number.MAX_VALUE,
        maxLifeTime: Number.MAX_VALUE
    };

    public constructor( @Optional() private ngxStorage: NgxStorageBase) {
        this.validateNgxStorage();
    }

    /**
     * Set new item into storage by key
     * @param key - stoarge key
     * @param value - storage value
     * @param options - (optional - by default will be like default storage) item settings (lifeTime: in the seconds, maxLifeTime: in the seconds)
     * @return Boolean true - success, false - something happened (see into browser developer console)
     */
    public set(key: string, value: any, options?: NgxStorageOptions): boolean {
        let storageKey = this.toStorageKey(key);
        options = options ? options : this.defaultNgxOptions;

        return this.ngxStorage.setItem(storageKey, this.getStorageValue(value, options));
    }

    /**
     * Get item from storage by key
     * @param key - storage key
     * @return any or null if item by the current key not found
     */
    public get(key: string): any {
        let storageValue = this.ngxStorage.getItem(this.toStorageKey(key));
        let value: any = null;

        if (storageValue) {
            if (this.validateStorageValue(storageValue)) {
                value = storageValue.value;
            } else {
                this.destroy(key);
            }
        }
        return value;
    }

    /**
     * Delete item from storage by key
     * @param key - storage key
     * @return void
     */
    public destroy(key: string): void {
        this.ngxStorage.deleteItem(this.toStorageKey(key));
        this.destroyFromTag(this.toStorageKey(key));
    }

    /**
     * Clear all storage
     * @return void
     */
    public destroyAll(): void {
        this.ngxStorage.destroyAll();
    }

    public getTagData(tag: string) {
        let tags = this.get(this.ngxTagsStorageKey()) || {},
            result: { [key: string]: any } = {};
        if (tags[tag]) {
            tags[tag].forEach((key: string) => {
                let data = this.get(this.fromStorageKey(key));
                if (data) {
                    result[this.fromStorageKey(key)] = data;
                }
            });
        }
        return result;
    }

    public useStorage() {
        let service = new NgxStorageService(this.init());
        service.setGlobalPrefix(this.getNgxPrefix());
        return service;
    }

    public destroyByTag(tag: string) {
        let tags = this.get(this.ngxTagsStorageKey()) || {};
        if (tags[tag]) {
            tags[tag].forEach((key: string) => {
                this.ngxStorage.deleteItem(key);
            });
            delete tags[tag];
            this.set(this.ngxTagsStorageKey(), tags);
        }
    }

    public setGlobalPrefix(prefix: string) {
        this.ngxPrefix = prefix;
    }

    private validateNgxStorage() {
        if (!this.ngxStorage) {
            this.ngxStorage = this.init();
        }
        if (!this.ngxStorage.isEnabled()) {
            throw new Error('Please enable cookies and local-storage in your browser.');
        }
    }

    private destroyFromTag(key: string) {
        let tags = this.get(this.ngxTagsStorageKey()) || {},
            index: number;
        for (let tag in tags) {
            index = tags[tag].indexOf(key);
            if (index !== -1) {
                tags[tag].splice(index, 1);
                this.set(this.ngxTagsStorageKey(), tags);
                break;
            }
        }
    }

    private init(): NgxStorageBase {
        // TODO: need to implement factory method
        let storage: NgxStorageBase;
        storage = new NgxLocalStorageService();
        return storage;
    }

    private toStorageKey(key: string) {
        return this.getNgxPrefix + key;
    }

    private fromStorageKey(key: string) {
        return key.replace(this.getNgxPrefix(), '');
    }

    private getStorageValue<T>(value: any, options: NgxStorageOptions): NgxStorageResponse<T> {
        return {
            value: value,
            options: this.convertToNgxOptions(options)
        };
    }

    private convertToNgxOptions(options: NgxStorageOptions): NgxStorageOptions {
        let storageOptions: NgxStorageOptions = {};
        storageOptions.lifeTime = options.lifeTime ? options.lifeTime :
            (options.maxLifeTime ? (Date.now() + (options.maxLifeTime * 1000)) : this.defaultNgxOptions.lifeTime);
        storageOptions.maxLifeTime = options.maxLifeTime ? options.maxLifeTime : this.defaultNgxOptions.maxLifeTime;
        return storageOptions;
    }

    private validateStorageValue<T>(value: NgxStorageResponse<T>): boolean {
        return !!value.options.lifeTime && value.options.lifeTime > Date.now();
    }

    private isSystemKey(key: string) {
        return [this.ngxTagsStorageKey].indexOf(() => key) !== -1;
    }

    private saveTag(tag: string, key: string) {
        let tags = this.get(this.ngxTagsStorageKey()) || {};
        if (!tags[tag]) {
            tags[tag] = [key];
        } else {
            tags[tag].push(key);
        }
        this.set(this.ngxTagsStorageKey(), tags);
    }

    private getNgxPrefix() {
        return this.ngxPrefix;
    }

    private ngxTagsStorageKey() {
        return `${this.ngxPrefix}Tags`;
    }
}