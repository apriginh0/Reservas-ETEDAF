import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminApprovalPage } from './admin-approval.page';

const routes: Routes = [
  {
    path: '',
    component: AdminApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminApprovalPageRoutingModule {}
