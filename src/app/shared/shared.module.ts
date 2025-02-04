import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Importe os componentes
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { LogoutButtonComponent } from '../components/logout-button/logout-button.component';

@NgModule({
  declarations: [
    LoginFormComponent,       // Declare o componente LoginForm
    LogoutButtonComponent,    // Declare o componente LogoutButton
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    LoginFormComponent,       // Exporte o componente LoginForm
    LogoutButtonComponent,    // Exporte o componente LogoutButton
  ]
})
export class SharedModule {}


