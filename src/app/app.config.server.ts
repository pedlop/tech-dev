import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

import { StorageService } from '@services/storage/storage.service';
import { StorageServerService } from '@services/storage/storage-server.service';

import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
    providers: [{ provide: StorageService, useClass: StorageServerService }, provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
