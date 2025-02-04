import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { AuthGuard } from './guards/auth.guard'; // Importar o AuthGuard

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
    path: '**',
    redirectTo: 'login', // Coloque isso por último
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

