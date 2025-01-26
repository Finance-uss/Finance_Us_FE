import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AlarmIcon from '../../../assets/icons/common/Alarm.svg';
import SearchIcon from '../../../assets/icons/common/Search.svg';

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end; 
  padding: 20px;
  background-color: #ffffff;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  cursor: pointer; 
`;

const SearchHeader = () => {
    const navigate = useNavigate(); 

    const handleSearchClick = () => {
        navigate('/search'); // 검색 페이지로 이동
    };

    const handleAlarmClick = () => {
        navigate('/alarm'); // 알림 페이지로 이동
    };

    return (
        <HeaderContainer>
            
            <Icon src={SearchIcon} alt="검색 페이지 가기" onClick={handleSearchClick} />
            <Icon src={AlarmIcon} alt="알림 페이지 가기" onClick={handleAlarmClick} />
        </HeaderContainer>
    );
};

export default SearchHeader;
