import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'teacher';
  approved: number;
}

interface LoginResponse {
  message: string;
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new BehaviorSubject<AuthUser | null>(null);
  private apiUrl = environment.apiUrl;
  private sessionResolved = false;
  private refreshRequest$: Observable<AuthUser | null> | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.restoreSession().subscribe();
  }

  private setCurrentUser(user: AuthUser | null) {
    this.currentUser.next(user);
    this.sessionResolved = true;
  }

  fetchCurrentUser(): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${this.apiUrl}/auth/me`, { withCredentials: true }).pipe(
      tap((user) => this.setCurrentUser(user))
    );
  }

  refreshCurrentUser(): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.apiUrl}/auth/me`, { withCredentials: true }).pipe(
      tap((user) => this.setCurrentUser(user)),
      catchError(() => {
        this.setCurrentUser(null);
        return of(null);
      })
    );
  }

  restoreSession(): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.apiUrl}/auth/me`, { withCredentials: true }).pipe(
      tap((user) => this.setCurrentUser(user)),
      catchError((error) => {
        if (error.status === 401) {
          return this.refreshSession();
        }

        this.setCurrentUser(null);
        return of(null);
      })
    );
  }

  refreshSession(): Observable<AuthUser | null> {
    if (this.refreshRequest$) {
      return this.refreshRequest$;
    }

    this.refreshRequest$ = this.http.post<{ message: string }>(
      `${this.apiUrl}/auth/refresh-token`,
      {},
      { withCredentials: true }
    ).pipe(
      switchMap(() => this.fetchCurrentUser()),
      map((user) => user ?? null),
      catchError(() => {
        this.setCurrentUser(null);
        return of(null);
      }),
      finalize(() => {
        this.refreshRequest$ = null;
      }),
      shareReplay(1)
    );

    return this.refreshRequest$;
  }

  ensureCurrentUser(): Observable<AuthUser | null> {
    if (this.sessionResolved) {
      return of(this.currentUser.value);
    }

    return this.restoreSession();
  }

  login(email: string, password: string): Observable<AuthUser> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      { email, password },
      { withCredentials: true }
    ).pipe(
      switchMap(() => this.fetchCurrentUser())
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data, { withCredentials: true });
  }

  logout(redirectToLogin = true) {
    this.http.post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true }).subscribe({
      next: () => this.clearSession(redirectToLogin),
      error: () => this.clearSession(redirectToLogin),
    });
  }

  clearSession(redirectToLogin = true) {
    this.setCurrentUser(null);
    if (redirectToLogin) {
      this.router.navigate(['/login']);
    }
  }

  handleUnauthorized() {
    this.clearSession(true);
  }

  isLoggedIn(): Observable<boolean> {
    return this.ensureCurrentUser().pipe(
      map((user) => !!user)
    );
  }

  getCurrentUser(): Observable<AuthUser | null> {
    return this.currentUser.asObservable();
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email }, { withCredentials: true });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, { token, newPassword }, { withCredentials: true });
  }
}
