// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      events: "events/", // ✅ force Vite to use the browser polyfill
    },
  },
  optimizeDeps: {
    include: ["parse", "events"],
  },
});
