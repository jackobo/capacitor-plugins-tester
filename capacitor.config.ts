import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jackobo.capacitor.pluginstester',
  appName: 'plugins-tester',
  webDir: 'build',
  server: {
    androidScheme: "http",
    url: "https://fast-sensible-arachnid.ngrok-free.app"
  },
};

export default config;
