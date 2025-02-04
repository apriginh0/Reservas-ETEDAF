import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestaoPageRoutingModule } from './gestao-routing.module';

import { GestaoPage } from './gestao.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestaoPageRoutingModule,
    SharedModule
  ],
  declarations: [GestaoPage]
})
export class GestaoPageModule {}
