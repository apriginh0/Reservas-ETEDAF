import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginData = {
    email: '',
    password: '',
  };
  isPasswordRecoveryEnabled = false;
  isLoading = false; // Controle de estado de carregamento
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    // Validação básica
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Preencha todos os campos obrigatórios!';
      return;
    }

    this.isLoading = true; // Ativa spinner/loading
    this.errorMessage = '';

    const email = this.loginData.email.trim().toLowerCase();
    this.authService.login(email, this.loginData.password)
      .pipe(
        finalize(() => this.isLoading = false) // Desativa spinner em qualquer caso
      )
      .subscribe({
        next: () => {
          // Navega após confirmar que o usuário está carregado
          this.router.navigate(['/home'])
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.handleLoginError(err);
        }
      });
  }

  onForgotPassword() {
    if (!this.loginData.email) {
      this.errorMessage = 'Adicione um e-mail válido.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.forgotPassword(this.loginData.email)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          alert('Um e-mail de redefinição de senha foi enviado.');
        },
        error: (err) => {
          console.error('Erro ao solicitar redefinição:', err);
          this.errorMessage = 'Erro ao enviar e-mail. Verifique o endereço.';
        }
      });
  }

  private handleLoginError(err: any) {
    // Mensagens de erro específicas
    if (err.status === 401) {
      this.errorMessage = 'E-mail ou senha incorretos!';
    } else if (err.status === 0) {
      this.errorMessage = 'Sem conexão com o servidor. Tente novamente mais tarde.';
    } else {
      this.errorMessage = 'Erro inesperado. Tente novamente.';
    }
  }
}


