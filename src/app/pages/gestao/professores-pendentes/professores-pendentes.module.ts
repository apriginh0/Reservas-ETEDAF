import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessoresPendentesPageRoutingModule } from './professores-pendentes-routing.module';

import { ProfessoresPendentesPage } from './professores-pendentes.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessoresPendentesPageRoutingModule,
    SharedModule
  ],
  declarations: [ProfessoresPendentesPage]
})
export class ProfessoresPendentesPageModule {}
