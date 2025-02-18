import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://13.209.210.46:8080',  // HTTPS URL로 변경
        changeOrigin: true,
        secure: true, // HTTPS로 요청이 처리되도록 설정
      }
    }
  },
  build: {
    outDir: "dist",
  },
});
