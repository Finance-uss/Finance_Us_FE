import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,  // .env 파일의 VITE_API_URL 변수를 사용
        changeOrigin: true,
        secure: false, // 서버가 HTTPS가 아니라면 `false`로 설정
      }
    }
  },
  build: {
    outDir: "dist", 
  },
});
