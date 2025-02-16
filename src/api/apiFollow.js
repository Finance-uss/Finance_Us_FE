import axiosInstance from "./axiosInstance";

/**
 * 사용자가 팔로우한 목록을 조회하는 함수 (GET 요청)
 * @param {string} accessToken - Authorization 헤더에 사용할 토큰
 * @param {number} [lastfollowingId=null] 
 * @param {number} [size=10] - 한 번에 조회할 데이터 개수
 * @returns {Promise<Array>} - 팔로우한 사용자 목록 배열
 */

export const getFollowList = async (accessToken, lastfollowingId = null, size = 10) => {
    try {
        const response = await axiosInstance.get(`/api/follows`, {
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

export const followUser = async (accessToken, followingId) => {
    try {
        const response = await axiosInstance.post(
            `/api/follows/${followingId}`,
            {}, { headers: { Authorization: `Bearer ${accessToken}` } } 
        );
        console.log("API 응답 데이터:", response.data);
        return response.data.isSuccess;
    } catch (error) {
        console.error("팔로우 실패:", error);
        throw error.response?.data?.message || "팔로우하는 중 오류가 발생했습니다.";
    }
};


export const unfollowUser = async (accessToken, followingId) => {
    try {
        const response = await axiosInstance.delete(`/api/follows/${followingId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("API 응답 데이터:", response.data);
        return response.data.isSuccess;
    } catch (error) {
        console.error("언팔로우 실패:", error);
        throw error.response?.data?.message || "언팔로우하는 중 오류가 발생했습니다.";
    }
};

/**
 * 특정 가계부 조회
 * @param {string} accessToken - Authorization 헤더에 사용할 토큰
 * @param {number} followId - 조회할 사용자의 followId
 * @returns {Promise<Object>} - 팔로우 사용자 가계부 데이터
 */
export const getFollowFinance = async (accessToken, followingId) => {
    try {
        const response = await axiosInstance.get(`/api/account/follow/${followingId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log("API 응답 데이터:", response.data);
        return response.data.isSuccess ? response.data.result : null;
    } catch (error) {
        console.error("팔로우한 사용자 가계부 조회 실패:", error);
        throw error.response?.data?.message || "팔로우한 사용자 가계부 불러오는 중 오류 발생";
    }
};

// 가계부 좋아요
export const accountLike = async (accessToken, accountId) => {
    try {
        const response = await axiosInstance.post(`/api/account/like`, {accountId},
            { headers: { Authorization: `Bearer ${accessToken}` } } 
        );
        console.log("API 응답 데이터:", response.data);
        return response.data.isSuccess? response.data.result.totalLike : null;
    } catch (error) {
        console.error("좋아요 실패:", error);
        throw alert(error.response?.data?.message || "좋아요 중 오류가 발생했습니다.");
    }
};

// 가계부 응원해요
export const accountCheer = async (accessToken, accountId) => {
    try {
        const response = await axiosInstance.post(`/api/account/cheer`, {accountId}, 
            { headers: { Authorization: `Bearer ${accessToken}` } } 
        );
        console.log("API 응답 데이터:", response.data);
        return response.data.isSuccess? response.data.result.totalCheer : null;
    } catch (error) {
        console.error("응원해요 실패:", error);
        throw alert(error.response?.data?.message || "응원 중 오류가 발생했습니다.");
    }
};
