import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessoresPendentesPage } from './professores-pendentes.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessoresPendentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessoresPendentesPageRoutingModule {}
