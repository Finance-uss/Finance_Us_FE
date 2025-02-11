import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../../styles/common/SearchHeader/style';
import AlarmIcon from '../../../assets/icons/common/Alarm.svg';
import SearchIcon from '../../../assets/icons/common/Search.svg';
import axiosInstance from '../../../api/axiosInstance';import {useAuth} from '../../../contexts/AuthContext'; 
const SearchHeader = () => {
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
                console.log("알림 API 응답:", response.data);
                if (response.data.isSuccess) {
                    console.log("isUnread 값:", response.data.result.hasUnread);
                    setIsUnread(response.data.result.hasUnread); 
                }
            } catch (error) {
                console.error("읽지 않은 알림 확인 실패:", error);
            }
        };
        checkUnreadAlarms(); 
    }, [token]); 

    const handleSearchClick = () => {
        navigate("/search"); 
    };

    const handleAlarmClick = () => {
        navigate("/alarm"); 
    };

    return (
        <S.HeaderContainer>
            <S.Icon src={SearchIcon} alt="검색 페이지 가기" onClick={handleSearchClick} />
            <S.AlarmContainer>
                {isUnread && <S.RedDot />} 
                <S.Icon src={AlarmIcon} alt="알림 페이지 가기" onClick={handleAlarmClick} />
            </S.AlarmContainer>
        </S.HeaderContainer>
    );
};

export default SearchHeader;