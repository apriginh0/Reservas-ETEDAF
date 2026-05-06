import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  private userSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkUserRole();
  }

  // Verifica o papel do usuário
  checkUserRole() {
    this.userSub = this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.isAdmin = user?.role === 'admin';
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
    this.router.navigate([route]);
  }
}

