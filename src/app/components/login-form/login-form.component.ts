import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (res) => {
        this.router.navigate(['/home']); // Redireciona para a página principal
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.errorMessage = 'Credenciais inválidas. Tente novamente!';
      }
    });
  }

  onForgotPassword() {
    if (!this.loginData.email) {
      this.errorMessage = 'Adicione um e-mail válido.';
      return;
    }

    this.authService.forgotPassword(this.loginData.email).subscribe({
      next: () => {
        this.errorMessage = ''; // Limpar mensagem de erro anterior
        alert('Um e-mail de redefinição de senha foi enviado.');
      },
      error: (err) => {
        console.error('Erro ao solicitar redefinição de senha:', err);
        this.errorMessage = 'Erro ao processar a solicitação. Tente novamente.';
      },
    });
  }

}



