import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Relativer Pfad für die Assets
  build: {
    outDir: "dist", // Output-Verzeichnis
  },
  server: {
    host: true, // Externen Zugriff ermöglichen
    port: 3000, // Entwicklungsserver-Port
  },
  resolve: {
    alias: {
      '@': '/src', // Vereinfachte Importe
    },
  },
});