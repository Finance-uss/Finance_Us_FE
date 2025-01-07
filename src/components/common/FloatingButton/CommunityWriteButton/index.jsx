import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { IconContainer, Icon, FloatingButtonWrapper } from '../../../../styles/common/FloatingButton/CommunityWriteButton/style';

import CommunityWrite from "../../../../assets/icons/common/CommunityWrite.svg";

const CommunityWriteButton = () => {
  return (
    <IconContainer>
    {/* 게시물 작성 페이지로 이동 (임시 링크 설정) */}
        <Link to="/onboarding"> 
            <FloatingButtonWrapper>
                <Icon src={CommunityWrite} alt="Community Write Icon" />
            </FloatingButtonWrapper>
        </Link>  
      
    </IconContainer>
  );
};

export default CommunityWriteButton;
