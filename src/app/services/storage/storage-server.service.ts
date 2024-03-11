import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class StorageServerService extends StorageService {
    constructor() {
        super({
            clear: () => {},
            getItem: (key: string) => JSON.stringify({ key }),
            setItem: (key: string, value: string) => JSON.stringify({ [key]: value }),
            key: (index: number) => index.toString(),
            length: 0,
            removeItem: (key: string) => JSON.stringify({ key }),
        });
    }
}
