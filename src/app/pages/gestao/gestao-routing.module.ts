import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestaoPage } from './gestao.page';

const routes: Routes = [
  {
    path: '',
    component: GestaoPage,
  },
  {
    path: 'professores-pendentes',
    loadChildren: () => import('./professores-pendentes/professores-pendentes.module').then(m => m.ProfessoresPendentesPageModule)
  },
  {
    path: 'professores-cadastrados',
    loadChildren: () => import('./professores-cadastrados/professores-cadastrados.module').then(m => m.ProfessoresCadastradosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestaoPageRoutingModule {}
