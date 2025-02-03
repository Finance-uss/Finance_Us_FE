import styled from 'styled-components';

export const IconContainer = styled.div`
  position: fixed;
  bottom: 77px; 
  right: 20px; 
  display: flex;
  flex-direction: column-reverse; 
  gap: 10px; 
  z-index: 100;
  align-items: center; 
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.50);
  z-index: 0;
  transition: opacity 0.5s ease-in-out; 
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
  transition: transform 0.3s ease;
  z-index: 2; 
`;

export const Icon = styled.img`
  width: 25px;
  height: 25px; 
`;


