import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.presentToast('Token inválido ou ausente.', 'danger');
        this.router.navigate(['/login']);
      }
    });
  }

  async resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.presentToast('As senhas não coincidem.', 'warning');
      return;
    }

    if (this.newPassword.length < 6) {
      this.presentToast('A senha deve ter pelo menos 6 caracteres.', 'warning');
      return;
    }

    this.isLoading = true;

    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: async () => {
        this.isLoading = false;
        await this.presentToast('Senha redefinida com sucesso! Faça login.', 'success');
        this.router.navigate(['/login']);
      },
      error: async (error) => {
        this.isLoading = false;
        console.error(error);
        await this.presentToast('Erro ao redefinir senha. O link pode ter expirado.', 'danger');
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
