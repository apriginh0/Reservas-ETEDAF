import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExclusaoPage } from './exclusao.page';

const routes: Routes = [
  {
    path: '',
    component: ExclusaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExclusaoPageRoutingModule {}
