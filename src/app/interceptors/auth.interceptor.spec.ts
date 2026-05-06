import { TestBed } from '@angular/core/testing';
import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['handleUnauthorized', 'refreshSession']);
    authServiceSpy.refreshSession.and.returnValue(of(null));

    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    });

    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('adds withCredentials to outgoing requests', (done) => {
    const request = new HttpRequest('GET', '/api/test');
    const next: HttpHandler = {
      handle: (req) => {
        expect(req.withCredentials).toBeTrue();
        return of(new HttpResponse({ status: 200 }));
      },
    };

    interceptor.intercept(request, next).subscribe(() => done());
  });

  it('tries to refresh the session and retries the request after a 401', (done) => {
    authServiceSpy.refreshSession.and.returnValue(of({
      id: 1,
      name: 'Teacher',
      email: 'teacher@example.com',
      role: 'teacher',
      approved: 1,
    }));

    let calls = 0;
    const request = new HttpRequest('GET', '/api/protected');
    const next: HttpHandler = {
      handle: (req) => {
        calls += 1;

        if (calls === 1) {
          expect(req.headers.has('X-Session-Retry')).toBeFalse();
          return throwError(() => ({ status: 401 }));
        }

        expect(req.headers.get('X-Session-Retry')).toBe('true');
        return of(new HttpResponse({ status: 200 }));
      },
    };

    interceptor.intercept(request, next).subscribe(() => {
      expect(authServiceSpy.refreshSession).toHaveBeenCalled();
      expect(authServiceSpy.handleUnauthorized).not.toHaveBeenCalled();
      expect(calls).toBe(2);
      done();
    });
  });

  it('logs out when refresh cannot recover the session', (done) => {
    authServiceSpy.refreshSession.and.returnValue(of(null));

    const request = new HttpRequest('GET', '/api/protected');
    const next: HttpHandler = {
      handle: () => throwError(() => ({ status: 401 })),
    };

    interceptor.intercept(request, next).subscribe({
      error: () => {
        expect(authServiceSpy.refreshSession).toHaveBeenCalled();
        expect(authServiceSpy.handleUnauthorized).toHaveBeenCalled();
        done();
      },
    });
  });
});
