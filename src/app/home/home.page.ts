import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  private userSub!: Subscription;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.checkUserRole();
  }

  // Verifica o papel do usuário
  checkUserRole() {
    this.userSub = this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.isAdmin = user?.role === 'admin';
      },
      error: (error) => {
        console.error('Erro ao obter usuário:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
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

