import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'br.com.etedaf.reservas',
  appName: 'On Lab',
  webDir: 'www',
  server: {
    allowNavigation: ['reservas-etedaf-api.onrender.com'],
    // Keep the WebView on http://localhost so local emulator builds can call
    // the host machine API at http://10.0.2.2 without mixed-content blocking.
    androidScheme: 'http',
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body,
    },
  },
};

export default config;
