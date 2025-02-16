import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../../../styles/common/SearchHeader/style';
import AlarmIcon from '../../../../assets/icons/common/Alarm.svg';
import newAlarmIcon from '../../../../assets/icons/common/Community/Alarmnew.svg';
import axiosInstance from '../../../../api/axiosInstance';
import { useAuth } from '../../../../contexts/AuthContext';

const AlarmIconComponent = () => {
    const navigate = useNavigate();
    const { formData } = useAuth();
    const token = formData.token;
    const [isUnread, setIsUnread] = useState(false);

    useEffect(() => {
        const checkUnreadAlarms = async () => {
            if (!token) return;
            try {
                const response = await axiosInstance.get("/api/notifications/unread", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.isSuccess) {
                    setIsUnread(response.data.result.hasUnread);
                }
            } catch (error) {
                console.error("읽지 않은 알림 확인 실패:", error);
            }
        };
        checkUnreadAlarms();
    }, [token]);

    const handleAlarmClick = () => {
        navigate("/alarm");
    };

    return (
        <S.AlarmContainer>
            <S.Icon src={isUnread?newAlarmIcon:AlarmIcon} alt="알림 페이지 가기" onClick={handleAlarmClick} />
        </S.AlarmContainer>
    );
};

export default AlarmIconComponent;
