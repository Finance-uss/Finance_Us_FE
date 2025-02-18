import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // API의 기본 URL
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token"); // Access Token 가져오기
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`; // Authorization 헤더 추가
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Access Token 만료 에러(403 Unauthorized) 처리
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한 루프 방지

            try {
                // Access Token 재발급 요청
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
                    {
                        oldAccessToken: localStorage.getItem("token"), // 기존 Access Token
                    }
                );

                const newAccessToken = response.data.accessToken; // 새 Access Token
                localStorage.setItem("token", newAccessToken); // 새 Access Token 저장

                // 원래 요청에 새 Access Token 추가
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest); // 원래 요청 재시도
            } catch (error) {
                console.error("Access Token 재발급 실패:", error);
                // 재발급 실패 시 로그아웃 처리
                localStorage.removeItem("token");
                window.location.href = "/login"; // 로그인 페이지로 이동
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
