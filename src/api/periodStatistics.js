import axiosInstance from './axiosInstance';

/**
 * 기간 통계 데이터를 가져오는 함수 (GET 요청)
 * @param {string} token - Authorization 헤더에 사용할 토큰
 * @param {number} startYear - 시작 연도
 * @param {number} startMonth - 시작 월
 * @param {number} endYear - 종료 연도
 * @param {number} endMonth - 종료 월
 * @param {string} type - 'expense' 또는 'income'
 * @returns {Promise<Object>} - 기간 통계 데이터
 */
export const getPeriodStatisticsData = async (token, startYear, startMonth, endYear, endMonth, type) => {
    try {
        const response = await axiosInstance.get('/api/statistics/period/', {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                startYear,
                startMonth,
                endYear,
                endMonth,
                type,
            },
        });

        return response.data; // 반환할 데이터
    } catch (error) {
        console.error("기간 통계 데이터 조회 실패:", error);
        throw error.response?.data?.message || "기간 통계 데이터를 불러오는 중 오류가 발생했습니다.";
    }
};

/**
 * 기간 세부 데이터를 가져오는 함수 (GET 요청)
 * @param {string} token - Authorization 헤더에 사용할 토큰
 * @param {number} year - 연도
 * @param {number} month - 월
 * @param {string} type - 'expense' 또는 'income'
 * @returns {Promise<Object>} - 기간 세부 데이터
 */
export const getPeriodDetails = async (token, year, month, type) => {
    try {
        const response = await axiosInstance.get('/api/statistics/period/details', {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                year,
                month,
                type,
            },
        });

        return response.data; // 반환할 데이터
    } catch (error) {
        console.error("기간 세부 데이터 조회 실패:", error);
        throw error.response?.data?.message || "기간 세부 데이터를 불러오는 중 오류가 발생했습니다.";
    }
};
