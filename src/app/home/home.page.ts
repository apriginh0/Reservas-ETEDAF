import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkUserRole();
  }

  // Verifica o papel do usuário
  async checkUserRole() {
    const token = await this.authService.getToken();
    if (token) {
      try {
        // Decodificar o token para pegar o "role" (alternativa ao JWT decoding)
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.isAdmin = payload.role === 'admin';
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      console.warn('Nenhum token encontrado');
    }
  }

  // Navega para uma rota específica
  navigateTo(route: string) {
    this.router.navigate([route]).then(
      (success) => console.log('Navegação bem-sucedida:', success),
      (error) => console.error('Erro na navegação:', error)
    );
  }
}

