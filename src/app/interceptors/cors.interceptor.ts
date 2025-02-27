import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('[CORS Interceptor] Enviando requisição para:', req.url);
    return next.handle(req).pipe(
      catchError((error) => {
        console.error('[CORS Interceptor] Erro detectado:', error);
        return throwError(() => error);
      })
    );
  }
}