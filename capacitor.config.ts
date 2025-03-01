import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'br.com.etedaf.reservas',
  appName: 'On Lab',
  webDir: 'www',
  server: {
    allowNavigation: ["reservas-etedaf-api.onrender.com"],
    androidScheme: 'https'  // 🚀 Garante que as requisições da API sejam seguras no Android
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body, // ✅ Altere para 'body' ou 'ionic' para redimensionamento automático
    }
  }
};

export default config;
