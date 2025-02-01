import { defineConfig } from "vite"; // ✅ Make sure this import exists
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/imageboard/", // ✅ Ensure this is correct for Netlify
});