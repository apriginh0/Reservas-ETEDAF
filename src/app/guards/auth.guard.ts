import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Importa o jwt-decode

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {

    const token = localStorage.getItem('token'); // Pega o token do localStorage

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decodifica o token
        const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos

        if (decodedToken.exp > currentTime) {
          return true;
        } else {
          console.warn('AuthGuard: Token expirado.');
        }
      } catch (e) {
        console.error('AuthGuard: Erro ao decodificar o token:', e);
      }
    }

    console.warn('AuthGuard: Acesso negado, redirecionando para login...');
    this.router.navigate(['/login']);
    return false;
  }
}





