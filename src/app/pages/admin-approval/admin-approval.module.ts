import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminApprovalPageRoutingModule } from './admin-approval-routing.module';

import { AdminApprovalPage } from './admin-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminApprovalPageRoutingModule
  ],
  declarations: [AdminApprovalPage]
})
export class AdminApprovalPageModule {}
