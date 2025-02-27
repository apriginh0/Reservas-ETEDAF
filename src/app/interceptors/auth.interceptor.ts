import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone a requisição para adicionar configurações globais
    const modifiedReq = req.clone({
      withCredentials: true,
      setHeaders: req.headers.has('Content-Type') ? {} : { 'Content-Type': 'application/json' }
    });

    return next.handle(modifiedReq).pipe(
      catchError(error => {
        // Tratar erros 401 (token expirado)
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}


