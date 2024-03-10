import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "project-together",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
