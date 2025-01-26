import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: absolute;
  top: 148px;
  z-index: 1000;
  display: flex;
  float:right;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color:     white;
  padding: 16px 28px 16px 27px;
  border-radius: 8px;
  width: 120px;
  height:auto;
  position: relative;
  z-index: 10;
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.16);box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.04);

`;

export const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width:16px;
  height:16px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap:16px;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  color:#5C5C5C;
  text-align:center;
`;