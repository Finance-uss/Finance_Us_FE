import { useState } from "react";
import { createAccount, updateAccount, deleteAccount } from "../api/account";

/**
 * 가계부 관련 API 요청을 관리하는 커스텀 훅
 * @returns {object} handleRequest, loading, error, data
 */
export const useAccount = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * API 요청을 실행하는 함수 (POST, PATCH, DELETE, GET 지원)
     * @param {string} method - HTTP 요청 메서드 ('POST' | 'PATCH' | 'DELETE' | 'GET')
     * @param {string} url - 요청을 보낼 API 엔드포인트
     * @param {Object} [requestData] - 서버로 보낼 데이터 (POST, PATCH)
     * @param {Object} [params] - 추가적으로 전달할 쿼리스트링 (GET, PATCH, DELETE)
     */
    const handleRequest = async (method, requestData = null, params = null) => {
        setLoading(true);
        setError(null);

        try {
            let response;

            if (method === "POST") {
                response = await createAccount(requestData);
            } else if (method === "PATCH") {
                response = await updateAccount(requestData.id, requestData, params); // ✅ params 추가
            } else if (method === "DELETE") {
                response = await deleteAccount(requestData.id, params); // ✅ params 추가
            } else {
                throw new Error("지원되지 않는 요청 메서드입니다.");
            }

            console.log(`${method} 성공:`, response);
            return response;
        } catch (err) {
            console.error(`${method} 요청 실패:`, err);
            setError(err.response?.data?.message || "요청 처리 중 오류가 발생했습니다.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleRequest, loading, error };
};
