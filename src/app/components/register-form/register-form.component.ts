import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.authService.register(formData).subscribe({
        next: () => {
          alert('Solicitação de cadastro enviada com sucesso!');
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro no registro:', error);
          alert('Erro ao enviar a solicitação de cadastro.');
        },
      });
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
