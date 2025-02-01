import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/imageboard/", // Ensure this matches your deployment subdirectory
  build: {
    outDir: "dist", // Ensure output directory is set correctly
  },
  server: {
    host: true, // Allows external access if needed
    port: 3000, // Your development server port
  },
  resolve: {
    alias: {
      '@': '/src', // Simplifies imports from the 'src' directory
    },
  },
});