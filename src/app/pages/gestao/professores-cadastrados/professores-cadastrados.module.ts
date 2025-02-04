import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessoresCadastradosPageRoutingModule } from './professores-cadastrados-routing.module';

import { ProfessoresCadastradosPage } from './professores-cadastrados.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessoresCadastradosPageRoutingModule,
    SharedModule
  ],
  declarations: [ProfessoresCadastradosPage]
})
export class ProfessoresCadastradosPageModule {}
