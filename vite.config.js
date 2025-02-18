import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";


export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      '/api': {
        target: 'http://13.209.210.46:8080',  // 백엔드 서버의 URL이 HTTP라도 프록시 설정이 필요
        changeOrigin: true,
        secure: false,  // HTTP 서버로 요청을 보낼 수 있도록 설정
        rewrite: (path) => path.replace(/^\/api/, ''),  // '/api' 제거
      },
    },
  },
});