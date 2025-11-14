// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // ✅ use absolute path (no trailing slash)
      events: resolve(__dirname, "node_modules/events"),
      process: "process/browser",
      util: "util/",
    },
  },
  define: {
    "process.env": {}, // prevents process.env undefined errors
  },
  optimizeDeps: {
    include: ["parse", "events", "process", "util"],
  },
});
