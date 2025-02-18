import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance.js";

export const useAccountData = (data, url, params) => {
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // data, url, params가 바뀌거나 refetch() 호출 시 최신 데이터를 불러옴
    const fetchAccountData = useCallback(async () => {
        if (!data) return;
        if (!url) {
            setAccountData(null);
            return;
        }
            setLoading(true);
            setError(null);
        try {
            const response = await axiosInstance.get(url, { params });
            setAccountData(response.data.result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [data, url, params]);

    useEffect(() => {
        fetchAccountData();
    }, [fetchAccountData]);

    return { accountData, loading, error, refetch: fetchAccountData };
};
