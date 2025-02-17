import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExclusaoPageRoutingModule } from './exclusao-routing.module';

import { ExclusaoPage } from './exclusao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExclusaoPageRoutingModule
  ],
  declarations: [ExclusaoPage]
})
export class ExclusaoPageModule {}
