import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';

import { AppStore } from '@stores/app.store';

export const applicationInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const store = inject(AppStore);

    const catchErrorHandler = (error: HttpErrorResponse) => {
        switch (error.status) {
            case 404:
                router.navigateByUrl('404');
                break;

            default:
                router.navigateByUrl('500');
                break;
        }
        return throwError(() => new Error(error.message));
    };

    const finalizeHandler = () => store.hideLoading();

    store.showLoading();
    return next(req).pipe(finalize(finalizeHandler), catchError(catchErrorHandler));
};
