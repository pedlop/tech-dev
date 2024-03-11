import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { StorageService } from '@services/storage/storage.service';

import { applicationInterceptor } from './core/application/application.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        StorageService,
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(withInterceptors([applicationInterceptor])),
    ],
};
