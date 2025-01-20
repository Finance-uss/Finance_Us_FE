import React from 'react';
import BackIcon from '../../../assets/icons/common/CaretLeft.svg';
import { HeaderContainer, BackButton, Title } from '../../../styles/User/BackHeader/style';

const BackHeader = ({ title, onBackClick }) => {
    return (
        <HeaderContainer>
            <BackButton onClick={onBackClick}>
                <img src={BackIcon} alt="뒤로 가기" />
            </BackButton>
            <Title>{title}</Title>
        </HeaderContainer>
    );
};

export default BackHeader;
