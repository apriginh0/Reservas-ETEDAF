import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';

interface AppBootstrapResponse {
  platform: string;
  currentVersion: string | null;
  minimumSupportedVersion: string | null;
  latestVersion: string | null;
  updateRequired: boolean;
  updateAvailable: boolean;
  storeUrl: string | null;
  message: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  private initialized = false;
  private blockingAlertOpen = false;

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  async initialize(): Promise<void> {
    if (this.initialized || Capacitor.getPlatform() !== 'android') {
      return;
    }

    this.initialized = true;

    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        void this.checkForRequiredUpdate();
      }
    });

    await this.checkForRequiredUpdate();
  }

  async checkForRequiredUpdate(): Promise<void> {
    if (Capacitor.getPlatform() !== 'android') {
      return;
    }

    try {
      const appInfo = await App.getInfo();
      const params = new HttpParams()
        .set('platform', 'android')
        .set('version', appInfo.version);

      const policy = await firstValueFrom(
        this.http.get<AppBootstrapResponse>(`${environment.apiUrl}/app/bootstrap`, {
          params,
          withCredentials: true,
        })
      );

      if (policy?.updateRequired) {
        await this.presentBlockingAlert(policy);
      }
    } catch {
      // If the check fails, keep the app usable and try again on next resume.
    }
  }

  private async presentBlockingAlert(policy: AppBootstrapResponse): Promise<void> {
    if (this.blockingAlertOpen) {
      return;
    }

    this.blockingAlertOpen = true;

    const details = [
      policy.message || 'Uma atualização do aplicativo é necessária.',
      policy.currentVersion ? `Versão instalada: ${policy.currentVersion}` : null,
      policy.minimumSupportedVersion ? `Versão mínima suportada: ${policy.minimumSupportedVersion}` : null,
    ]
      .filter(Boolean)
      .join('<br><br>');

    const alert = await this.alertController.create({
      header: 'Atualização necessária',
      message: details,
      backdropDismiss: false,
      keyboardClose: false,
      buttons: [
        {
          text: 'Fechar app',
          role: 'cancel',
          handler: () => {
            void App.exitApp();
          },
        },
        {
          text: 'Atualizar',
          handler: () => {
            if (policy.storeUrl) {
              window.location.assign(policy.storeUrl);
            }

            return false;
          },
        },
      ],
    });

    alert.onDidDismiss().then(() => {
      this.blockingAlertOpen = false;
    });

    await alert.present();
  }
}
