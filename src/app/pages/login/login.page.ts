import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterFormComponent } from 'src/app/components/register-form/register-form.component';
import { ForgotPasswordModalComponent } from 'src/app/components/forgot-password-modal/forgot-password-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  constructor(private modalCtrl: ModalController) {}

  // Abre o modal de Cadastro
  async openRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterFormComponent,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }

  // Abre o modal de Esqueci minha senha
  async openForgotPasswordModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordModalComponent,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }
}