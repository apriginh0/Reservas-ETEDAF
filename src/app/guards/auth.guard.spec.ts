import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  const authServiceMock = {
    ensureCurrentUser: jasmine.createSpy('ensureCurrentUser'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);
  });

  it('allows navigation when there is an authenticated user', (done) => {
    authServiceMock.ensureCurrentUser.and.returnValue(of({ id: 1, role: 'teacher' }));

    guard.canActivate().subscribe((allowed) => {
      expect(allowed).toBeTrue();
      done();
    });
  });

  it('redirects to login when there is no authenticated user', (done) => {
    authServiceMock.ensureCurrentUser.and.returnValue(of(null));

    guard.canActivate().subscribe((allowed) => {
      expect(allowed).toBeFalse();
      expect(router.navigate).toHaveBeenCalled();
      done();
    });
  });
});
