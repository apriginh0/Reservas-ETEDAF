import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Importe os componentes
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { LogoutButtonComponent } from '../components/logout-button/logout-button.component';
import { ForgotPasswordModalComponent } from '../components/forgot-password-modal/forgot-password-modal.component';

@NgModule({
  declarations: [
    LoginFormComponent,       // Declare o componente LoginForm
    LogoutButtonComponent,    // Declare o componente LogoutButton
    ForgotPasswordModalComponent // Declare o componente ForgotPasswordModal
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    LoginFormComponent,       // Exporte o componente LoginForm
    LogoutButtonComponent,    // Exporte o componente LogoutButton
    ForgotPasswordModalComponent // Exporte o componente ForgotPasswordModal
  ]
})
export class SharedModule {}


