import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterFormComponent } from 'src/app/components/register-form/register-form.component';

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
}