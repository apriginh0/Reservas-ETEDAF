import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaSalaPageRoutingModule } from './reserva-sala-routing.module';

import { ReservaSalaPage } from './reserva-sala.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaSalaPageRoutingModule,
    SharedModule
  ],
  declarations: [ReservaSalaPage]
})
export class ReservaSalaPageModule {}
