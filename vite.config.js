import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/imageboard/', // Basis-URL für die App
  build: {
    outDir: "dist", // Output-Verzeichnis
  },
  server: {
    host: true, // Erlaubt externen Zugriff
    port: 3000, // Entwicklungsserver-Port
  },
  resolve: {
    alias: {
      '@': '/src', // Vereinfachte Importe
    },
  },
});