import axiosInstance from "./axiosInstance";

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

export const followUser = async (followingId) => {
    try {
        const response = await axiosInstance.post(
            `/api/follows/${followingId}`,{}
        );
        console.log("API 응답 데이터:", response.data);
        return response.data.isSuccess;
    } catch (error) {
        console.error("팔로우 실패:", error);
        throw error.response?.data?.message || "팔로우하는 중 오류가 발생했습니다.";
    }
};


export const unfollowUser = async (followingId) => {
    try {
        const response = await axiosInstance.delete(`/api/follows/${followingId}`, );
        console.log("API 응답 데이터:", response.data);
        return response.data.isSuccess;
    } catch (error) {
        console.error("언팔로우 실패:", error);
        throw error.response?.data?.message || "언팔로우하는 중 오류가 발생했습니다.";
    }
};

export const getFollowFinance = async (followingId) => {
    try {
        const response = await axiosInstance.get(`/api/account/follow/${followingId}`,);

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
