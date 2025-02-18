import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      '/api': {
        target: 'http://13.209.210.46:8080', // 백엔드 서버
        changeOrigin: true, // 요청 헤더의 Origin을 타겟 서버로 설정
        rewrite: (path) => path.replace(/^\/api/, ''), // /api를 제거하여 백엔드 엔드포인트로 전달
      },
    },
  },
  build: {
    outDir: "dist", 
  },
});
