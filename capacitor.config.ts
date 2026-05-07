import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const androidScheme = process.env.CAPACITOR_ANDROID_SCHEME || 'https';

const config: CapacitorConfig = {
  appId: 'br.com.etedaf.reservas',
  appName: 'On Lab',
  webDir: 'www',
  server: {
    allowNavigation: ['reservas-etedaf-api.onrender.com'],
    // Production should stay on https://localhost so secure auth cookies work
    // reliably on device. Local emulator builds can opt into http explicitly
    // by setting CAPACITOR_ANDROID_SCHEME=http before syncing Android.
    androidScheme,
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body,
    },
  },
};

export default config;
