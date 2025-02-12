import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.etedaf.reservas',
  appName: 'ETEDAF',
  webDir: 'www',
  server: {
    allowNavigation: ["reservas-etedaf-api.onrender.com"],
    androidScheme: 'https'  // 🚀 Garante que as requisições da API sejam seguras no Android
  }
};

export default config;
