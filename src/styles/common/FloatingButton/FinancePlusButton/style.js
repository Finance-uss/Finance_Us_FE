import styled from 'styled-components';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; 
// import { IconContainer, Icon, FloatingButtonWrapper } from '../../../../styles/common/FloatingButton/FinancePlusButton/style';

// import PlusIcon from "../../../../assets/icons/common/Plus.svg";
// import FinanceWrite from "../../../../assets/icons/common/FinanceWrite.svg";
// import Camera from "../../../../assets/icons/common/Camera.svg";

// const FloatingButton = () => {
//   const [showIcons, setShowIcons] = useState(false); 
//   const toggleIcons = () => {
//     setShowIcons(!showIcons);
//   };

//   return (
//     <IconContainer>
//       <FloatingButtonWrapper isPlus onClick={toggleIcons}>
//         <Icon src={PlusIcon} alt="Plus Icon" />
//       </FloatingButtonWrapper>
//       {showIcons && (
//         <>
//         {/* 가계부 작성 페이지로 이동 */}
//         <Link to="/"> 
//           <FloatingButtonWrapper >
//               <Icon src={FinanceWrite} alt="Finance Write Icon" showIcons={showIcons} />
//           </FloatingButtonWrapper>
//         </Link>
//         {/* 카메라로.. */}
//         <Link to="/"> 
//           <FloatingButtonWrapper>
//               <Icon src={Camera} alt="Camera Icon" showIcons={showIcons} />
//           </FloatingButtonWrapper>
//         </Link>
//         </>
          
//       )}
//     </IconContainer>
//   );
// };

// export default FloatingButton;
export const IconContainer = styled.div`
  position: fixed;
  bottom: 70px; 
  right: 20px; 
  display: flex;
  flex-direction: column-reverse; 
  gap: 10px; 
  z-index: 100;
  align-items: center; 
`;

export const FloatingButtonWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ isPlus }) => (isPlus ? '#142755' : '#ffffff')};
  border: 0.1px solid #818C99;
  box-shadow: 1px 1px 1px 0px #818C99;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;

`;

export const Icon = styled.img`
  width: 25px;
  height: 25px; 
`;


