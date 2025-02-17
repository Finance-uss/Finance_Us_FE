import { useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

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
