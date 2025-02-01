import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../../styles/common/SearchHeader/style';
import AlarmIcon from '../../../assets/icons/common/Alarm.svg';
import SearchIcon from '../../../assets/icons/common/Search.svg';
import axiosInstance from '../../../api/axiosInstance';

const API_URL = import.meta.env.VITE_API_URL; 

const SearchHeader = () => {
    const navigate = useNavigate(); 
    const [isUnread, setIsUnread] = useState(false);
    const userId = 2; // 실제 사용자 ID로 교체 필요..
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const checkUnreadAlarms = async () => {
            try {
                const response = await axiosInstance.get(`${API_URL}/api/notifications/unread?userId=${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });
                if (response.data.isSuccess) {
                    setIsUnread(response.data.result.isUnread); 
                }
            } catch (error) {
                console.error("읽지 않은 알림 확인 실패:", error);
            }
        };

        checkUnreadAlarms();
    }, [userId, accessToken]);

    const handleSearchClick = () => {
        navigate('/search'); // 검색 페이지로 이동
    };

    const handleAlarmClick = () => {
        navigate('/alarm'); // 알림 페이지로 이동
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
