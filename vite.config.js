import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/imageboard/', // Basis-URL für Subdirectory-Deployments
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
  // Middleware für das SPA-Routing in Entwicklungs- und Produktionsumgebungen
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});