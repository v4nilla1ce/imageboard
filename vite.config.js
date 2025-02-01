import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure correct base path for Netlify
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // Fix for Netlify SPA routing
  },
});