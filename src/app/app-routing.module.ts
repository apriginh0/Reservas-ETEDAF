import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'reserva-sala',
    loadChildren: () => import('./pages/reserva-sala/reserva-sala.module').then((m) => m.ReservaSalaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home/reserva-sala/:id/calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then((m) => m.CalendarioPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'gestao',
    loadChildren: () => import('./pages/gestao/gestao.module').then((m) => m.GestaoPageModule),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'agendamentos',
    loadChildren: () => import('./pages/agendamentos/agendamentos.module').then((m) => m.AgendamentosPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'privacidade',
    loadChildren: () => import('./pages/privacidade/privacidade.module').then((m) => m.PrivacidadePageModule),
  },
  {
    path: 'exclusao',
    loadChildren: () => import('./pages/exclusao/exclusao.module').then((m) => m.ExclusaoPageModule),
  },
  {
    path: 'erro',
    loadChildren: () => import('./pages/erro/erro.module').then((m) => m.ErroPageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then((m) => m.ResetPasswordPageModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
