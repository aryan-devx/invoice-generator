import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://invoice-generator-1-4788.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
