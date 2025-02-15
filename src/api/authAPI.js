import axiosInstance from "./axiosInstance";

export const authAPI = {
    sendAuthRequest: async ({ content, imgUrl }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('토큰이 없습니다. 로그인 해주세요.');
            }

            const requestData ={ content, imgUrl };

            const response = await axiosInstance.patch("/api/auth/user", requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("인증 요청 성공", response.data);
            return response.data;

        } catch (error) {
            console.error("인증 요청 실패", error);
            throw error;
        }
    }
};
