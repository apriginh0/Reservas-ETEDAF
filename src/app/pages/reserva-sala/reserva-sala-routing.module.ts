import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaSalaPage } from './reserva-sala.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaSalaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaSalaPageRoutingModule {}
