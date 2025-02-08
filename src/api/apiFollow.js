import axiosInstance from "./axiosInstance";

/**
 * 사용자가 팔로우한 목록을 조회하는 함수 (GET 요청)
 * @param {string} accessToken - Authorization 헤더에 사용할 토큰
 * @param {number} [lastfollowingId=null] - 페이지네이션을 위한 lastfollowingId
 * @param {number} [size=10] - 한 번에 조회할 데이터 개수
 * @returns {Promise<Array>} - 팔로우한 사용자 목록 배열
 */
export const getFollowList = async (accessToken, lastfollowingId = null, size = 10) => {
    try {
        const response = await axiosInstance.get("/api/follows", {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { size, ...(lastfollowingId && { lastfollowingId }) },
        });

        console.log("API 응답 데이터:", response.data);
        return response.data.isSuccess ? response.data.result.result : [];
    } catch (error) {
        console.error("팔로우 목록 조회 실패:", error);
        throw error.response?.data?.message || "팔로우 목록을 불러오는 중 오류가 발생했습니다.";
    }
};
