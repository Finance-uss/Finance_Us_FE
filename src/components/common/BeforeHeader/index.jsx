import React from 'react';
import { useNavigate } from 'react-router-dom';
import BeforeIconSrc from '../../../assets/icons/common/Before.svg';
import {HeaderContainer, Icon, Title} from '../../../styles/common/BeforeHeader/style';


const BeforeHeader = ({ text }) => {
    const navigate = useNavigate(); 

    const handleBackClick = () => {
        navigate(-1); // 이전 페이지로 이동
    };
  return (
    <HeaderContainer>
      <Icon src={BeforeIconSrc} alt="이전 탭가기" onClick={handleBackClick} />
      <Title>{text}</Title>
    </HeaderContainer>
  );
};

export default BeforeHeader;
