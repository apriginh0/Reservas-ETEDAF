import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new BehaviorSubject<any>(null);
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus(); // Inicializa o token
  }

  fetchCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`, { withCredentials: true }).pipe(
      tap((user) => {
        console.log("user:", user);
        this.currentUser.next(user);
        console.log("this.currentUser:", this.currentUser.next(user));
      }),
      catchError((error) => {
        if (error.status === 404) {
          console.error('Endpoint /auth/me não encontrado');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  private checkAuthStatus() {
    this.fetchCurrentUser().subscribe({
      next: (user) => {
        this.currentUser.next(user);
        if (user) this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao verificar autenticação:', err);
        this.currentUser.next(null);
        this.router.navigate(['/login']);
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }, { withCredentials: true }).pipe(
      tap(() => {
        this.checkAuthStatus(); // Força revalidação após login
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data, { withCredentials: true });
  }

  // Método de logout atualizado
  logout() {
    this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.currentUser.next(null); // Limpa o usuário
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro no logout:', error);
        this.currentUser.next(null);
        this.router.navigate(['/login']);
      }
    });
  }


  isLoggedIn(): Observable<boolean> {
    return this.currentUser.pipe(
      map(user => !!user) // Converte user para booleano
    );
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email }, { withCredentials: true });
  }

}


