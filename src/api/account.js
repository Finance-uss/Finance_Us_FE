import axiosInstance from "./axiosInstance";

/**
 * 새 가계부 데이터를 생성하는 함수 (POST 요청)
 * @param {Object} formData - 사용자 입력 데이터
 * @returns {Promise<Object>} - 서버 응답 데이터
 */
export const createAccount = async (formData) => {
    try {
        const response = await axiosInstance.post("/api/account", formData);
        return response.data;
    } catch (error) {
        console.error("POST 요청 실패:", error);
        throw error.response?.data?.message || "가계부 작성 중 오류가 발생했습니다.";
    }
};

/**
 * 기존 가계부 데이터를 수정하는 함수 (PATCH 요청)
 * @param {string} id - 수정할 데이터의 ID
 * @param {Object} updatedData - 업데이트할 데이터
 * @param {Object} [params] - 추가적으로 전달할 쿼리스트링
 * @returns {Promise<Object>} - 서버 응답 데이터
 */
export const updateAccount = async (id, updatedData, params = {}) => {
    try {
        const response = await axiosInstance.patch(`/api/account/${id}`, updatedData, { params }); // ✅ params 추가
        return response.data;
    } catch (error) {
        console.error("PATCH 요청 실패:", error);
        throw error.response?.data?.message || "가계부 수정 중 오류가 발생했습니다.";
    }
};

/**
 * 기존 가계부 데이터를 삭제하는 함수 (DELETE 요청)
 * @param {string} id - 삭제할 데이터의 ID
 * @param {Object} [params] - 추가적으로 전달할 쿼리스트링
 * @returns {Promise<void>} - 성공하면 아무것도 반환하지 않음
 */
export const deleteAccount = async (id, params = {}) => {
    try {
        await axiosInstance.delete(`/api/account/${id}`, { params }); // ✅ params 추가
    } catch (error) {
        console.error("DELETE 요청 실패:", error);
        throw error.response?.data?.message || "가계부 삭제 중 오류가 발생했습니다.";
    }
};