import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
})
export class ForgotPasswordModalComponent {
  email: string = '';
  isLoading: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async sendResetLink() {
    if (!this.email) {
      this.presentToast('Por favor, insira seu e-mail.', 'warning');
      return;
    }

    this.isLoading = true;

    this.authService.forgotPassword(this.email).subscribe({
      next: async () => {
        this.isLoading = false;
        await this.presentToast('Link de redefinição enviado para seu e-mail.', 'success');
        this.dismiss();
      },
      error: async (error) => {
        this.isLoading = false;
        console.error(error);
        await this.presentToast('Erro ao enviar e-mail. Verifique se o endereço está correto.', 'danger');
      }
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}
