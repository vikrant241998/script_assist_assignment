import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: true,       // 👈 Add this line to expose server to local network
    port: 5175        // 👈 Keep your custom port
  },
  plugins: [react()],
  build: {
    outDir: 'build'
  }
});
