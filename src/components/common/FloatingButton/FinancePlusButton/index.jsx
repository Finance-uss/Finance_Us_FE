import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { IconContainer, Icon, FloatingButtonWrapper, BackgroundOverlay } from '../../../../styles/common/FloatingButton/FinancePlusButton/style';

import CameraInput from '../../../Finance/Camera/CameraInput';

import plusIcon from "../../../../assets/icons/common/Plus.svg";
import FinanceWrite from "../../../../assets/icons/common/FinanceWrite.svg";
import Camera from "../../../../assets/icons/common/Camera.svg";

const FloatingButton = () => {
  const [showIcons, setShowIcons] = useState(false); 
  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  return (
    <IconContainer>
      {showIcons && <BackgroundOverlay />}

      <FloatingButtonWrapper isPlus onClick={toggleIcons}>
        <Icon src={plusIcon} alt="플러스 아이콘" />
      </FloatingButtonWrapper>
      {showIcons && (
        <>
          {/* 가계부 작성 페이지로 이동 */}
          <Link to="handwrite"> 
            <FloatingButtonWrapper style={{ transform: "translateX(-4em) translateY(1em)" }} >
                <Icon src={FinanceWrite} alt="가계부 작성 아이콘" />
            </FloatingButtonWrapper>
          </Link>
          <FloatingButtonWrapper style={{ transform: "translateY(3em)" }}>
              <CameraInput />
          </FloatingButtonWrapper>
        </>
          
      )}
    </IconContainer>
  );
};

export default FloatingButton;

// {/* 카메라로.. */}
// <Link to="camera"> 
// <FloatingButtonWrapper style={{ transform: "translateY(3em)" }}>
//     <Icon src={Camera} alt="카메라 아이콘" />
// </FloatingButtonWrapper>
// </Link>