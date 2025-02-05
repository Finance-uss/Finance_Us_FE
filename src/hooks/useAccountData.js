import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";

export const useAccountData = (data, url, params) => {
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!data) return;

        const fetchAccountData = async () => {
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
        };

        fetchAccountData();
    }, [data]);

    return { accountData, loading, error };
};