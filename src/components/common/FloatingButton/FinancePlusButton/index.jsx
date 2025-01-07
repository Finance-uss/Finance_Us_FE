import React, { useState } from 'react';
import { IconContainer, Icon, FloatingButtonWrapper } from '../../../../styles/common/FloatingButton/FinancePlusButton/style';

import PlusIcon from "../../../../assets/icons/common/Plus.svg";
import FinanceWrite from "../../../../assets/icons/common/FinanceWrite.svg";
import Camera from "../../../../assets/icons/common/Camera.svg";

const FloatingButton = () => {
  const [showIcons, setShowIcons] = useState(false); 
  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  return (
    <IconContainer>
      <FloatingButtonWrapper isPlus onClick={toggleIcons}>
        <Icon src={PlusIcon} alt="Plus Icon" />
      </FloatingButtonWrapper>
      {showIcons && (
        <>
        <FloatingButtonWrapper >
            <Icon src={FinanceWrite} alt="Finance Write Icon" showIcons={showIcons} />
          </FloatingButtonWrapper>
          <FloatingButtonWrapper>
            <Icon src={Camera} alt="Camera Icon" showIcons={showIcons} />
          </FloatingButtonWrapper>
        </>
          
      )}
    </IconContainer>
  );
};

export default FloatingButton;
