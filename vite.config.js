import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/imageboard/", // Set the correct base path for GitHub Pages
});