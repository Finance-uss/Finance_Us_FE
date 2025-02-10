import React from 'react';
import { Link } from 'react-router-dom'; 
import { IconContainer, Icon, FloatingButtonWrapper } from '../../../../styles/common/FloatingButton/CommunityWriteButton/style';

import CommunityWrite from "../../../../assets/icons/common/CommunityWrite.svg";

const CommunityWriteButton = () => {
  return (
    <IconContainer>
        <Link to="/community/postwrite"> 
            <FloatingButtonWrapper>
                <Icon src={CommunityWrite} alt="Community Write Icon" />
            </FloatingButtonWrapper>
        </Link>  
      
    </IconContainer>
  );
};

export default CommunityWriteButton;
