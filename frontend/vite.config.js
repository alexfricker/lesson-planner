import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/admin": {
        target: "http://localhost:8000/admin",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin/, ''),
      },
      "/api": {
        target: "http://localhost:8000/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      "/django-static": {
        target: "http://localhost:8000/django-static",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/django-static/, ''),
      },
    },
  },
});
