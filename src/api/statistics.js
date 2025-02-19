import axiosInstance from './axiosInstance';

/**
 * 통계 데이터를 가져오는 함수 (GET 요청)
 * @param {string} token - Authorization 헤더에 사용할 토큰
 * @param {number} year - 연도
 * @param {number} month - 월
 * @param {string} type - 'expense' 또는 'income'
 * @returns {Promise<Object>} - 통계 데이터
 */
export const getStatisticsData = async (token, year, month, type) => {
    try {
        const response = await axiosInstance.get('/api/statistics/category/', {
            headers: { Authorization: `Bearer ${token}` },
            params: { year, month, type },
        });

        return response.data; // 반환할 데이터
    } catch (error) {
        console.error("통계 데이터 조회 실패:", error);
        throw error.response?.data?.message || "통계 데이터를 불러오는 중 오류가 발생했습니다.";
    }
};

// 통계 목표 데이터를 가져오는 함수 (GET 요청)
export const getGoalStatisticsData = async (token, year, month, type) => {
    try {
        const response = await axiosInstance.get('/api/statistics/category/goal-per-total', {
            headers: { Authorization: `Bearer ${token}` },
            params: { year, month, type },
        });

        return response.data; // 반환할 데이터
    } catch (error) {
        console.error("목표 통계 데이터 조회 실패:", error);
        throw error.response?.data?.message || "목표 통계 데이터를 불러오는 중 오류가 발생했습니다.";
    }
};

// 각 카테고리 별 목표 지출/수익 데이터를 가져오는 함수 (GET 요청)
export const getCategoryGoalData = async (token, year, month, type) => {
    try {
        const response = await axiosInstance.get('/api/statistics/category/goal-per-category', {
            headers: { Authorization: `Bearer ${token}` },
            params: { year, month, type },
        });

        return response.data; // 반환할 데이터
    } catch (error) {
        console.error("카테고리 목표 데이터 조회 실패:", error);
        throw error.response?.data?.message || "카테고리 목표 데이터를 불러오는 중 오류가 발생했습니다.";
    }
};