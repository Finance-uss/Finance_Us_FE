import { useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
/**
 * useApi 커스텀 훅
 *
 * 사용자가 요청을 보낼 때 필요한 옵션들을 객체로 받아 처리합니다.
 * 기본적으로 loading, error, data 상태를 관리하며, 호출 시에 원하는 HTTP 메서드와 URL, params, body 등을 전달할 수 있습니다.
 *
 * @returns {Object} - { data, loading, error, request }
 *   - data: 응답 데이터
 *   - loading: 요청 진행 상태 (boolean)
 *   - error: 에러 객체 (있을 경우)
 *   - request: 요청을 수행하는 함수
 *
 * @example
 * const { data, loading, error, request } = useApi();
 *
 * // GET 요청
 * const fetchData = async () => {
 *   try {
 *     const result = await request({ method: "GET", url: "/api/items", params: { page: 1 } });
 *     console.log(result);
 *   } catch (err) {
 *     console.error(err);
 *   }
 * };
 *
 * // POST 요청
 * const createItem = async (itemData) => {
 *   try {
 *     const result = await request({ method: "POST", url: "/api/items", body: itemData });
 *     console.log(result);
 *   } catch (err) {
 *     console.error(err);
 *   }
 * };
 */
const useApi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async ({ method, url, params = {}, body = null, ...config }) => {
        setLoading(true);
        setError(null);
        try {
        const response = await axiosInstance({
            method,
            url,
            params,
            data: body, // axios에서 POST, PATCH 요청시 body는 data 키로 전달합니다.
            ...config,
        });
        setData(response.data);
        return response.data;
        } catch (err) {
        setError(err);
        throw err;
        } finally {
        setLoading(false);
        }
    }, []);

    return { data, loading, error, request };
};

export default useApi;
