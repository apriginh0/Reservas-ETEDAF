import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, NavigationCancel, NavigationError } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importar o AuthGuard
import { Router } from '@angular/router'; // Importe o Router

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard], // Proteger rota
  },
  {
    path: 'reserva-sala',
    loadChildren: () => import('./pages/reserva-sala/reserva-sala.module').then(m => m.ReservaSalaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home/reserva-sala/:id/calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then(m => m.CalendarioPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'gestao',
    loadChildren: () => import('./pages/gestao/gestao.module').then(m => m.GestaoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'privacidade',
    loadChildren: () => import('./pages/privacidade/privacidade.module').then( m => m.PrivacidadePageModule)
  },
  {
    path: 'exclusao',
    loadChildren: () => import('./pages/exclusao/exclusao.module').then( m => m.ExclusaoPageModule)
  },
  {
    path: 'erro',
    loadChildren: () => import('./pages/erro/erro.module').then(m => m.ErroPageModule)
  },
  {
    path: '**',
    redirectTo: 'login', // Coloque isso por último
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationCancel) {
        console.warn('Navegação cancelada:', event.reason);
        // Exemplo: Redirecionar para login se o motivo for autenticação
        if (event.reason === 'AuthGuard: Usuário não autenticado') {
          this.router.navigate(['/login']);
        }
      }
      if (event instanceof NavigationError) {
        console.error('Erro de navegação:', event.error);
        this.router.navigate(['/erro']); // Crie uma rota para erros se necessário
      }
    });
  }
}

