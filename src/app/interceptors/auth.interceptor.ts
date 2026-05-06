import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true,
      setHeaders: {
        ...(req.headers.has('Content-Type') ? {} : { 'Content-Type': 'application/json' }),
      },
    });

    return next.handle(modifiedReq).pipe(
      catchError((error) => {
        const isAuthRequest = req.url.includes('/auth/login')
          || req.url.includes('/auth/register')
          || req.url.includes('/auth/forgot-password')
          || req.url.includes('/auth/reset-password')
          || req.url.includes('/auth/me')
          || req.url.includes('/auth/refresh')
          || req.url.includes('/auth/refresh-token');

        if (error.status === 401 && !isAuthRequest && !req.headers.has('X-Session-Retry')) {
          const authService = this.injector.get(AuthService);

          return authService.refreshSession().pipe(
            switchMap((user) => {
              if (user) {
                return next.handle(modifiedReq.clone({
                  setHeaders: {
                    'X-Session-Retry': 'true',
                  },
                }));
              }

              authService.handleUnauthorized();
              return throwError(() => error);
            }),
            catchError((refreshError) => {
              authService.handleUnauthorized();
              return throwError(() => refreshError);
            })
          );
        }

        if (error.status === 401 && !isAuthRequest) {
          this.injector.get(AuthService).handleUnauthorized();
        }

        return throwError(() => error);
      })
    );
  }
}
