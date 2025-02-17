import axiosInstance from '../api/axiosInstance';

export const uploadImageToS3 = async (file) => {
    const token = localStorage.getItem("token"); // 저장된 토큰 가져오기

    if (!token) {
        throw new Error("인증 토큰이 없습니다. 로그인 후 다시 시도하세요.");
    }
    try {
        const formData = new FormData();
        formData.append("file", file); // 파일 추가

        const response = await axiosInstance.post("/api/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log("이미지 업로드 성공", response.data);
        return response.data;  // { url: 'S3 저장된 이미지 URL', fileName: '파일명' }

    } catch (error) {
        console.error("이미지 업로드 실패", error);
        throw error;
    }
};
