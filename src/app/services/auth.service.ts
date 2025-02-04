import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.initToken(); // Inicializa o token
  }

  private initToken() {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.isAuthenticated.next(true);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        if (response?.token) {
          this.saveToken(response.token);
        }
        if (response?.user?.id) {
          this.saveUserId(response.user.id);
        }
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.isAuthenticated.next(true);
  }

  saveUserId(userId: number) {
    localStorage.setItem('userId', userId.toString());
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Busca diretamente no localStorage
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
  }

}


