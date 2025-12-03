import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// eslint-disable-next-line no-empty-pattern
export default defineConfig(({ }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
