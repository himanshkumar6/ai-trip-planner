import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      "/hf": {
        target: "https://router.huggingface.co",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/hf\/models/, "/hf-inference/models"),
      },
    },
  },
});
