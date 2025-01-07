import styled from 'styled-components';

export const IconContainer = styled.div`
  position: fixed;
  bottom: 70px; 
  right: 20px; 
  display: flex;
  gap: 10px; 
  z-index: 100;
  align-items: center; 
`;

export const FloatingButtonWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0.1px solid #818C99;
  background-color: white;
  box-shadow: 1px 1px 1px 0px #818C99;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

`;

export const Icon = styled.img`
  width: 26px; 
  height: 26px;
`;
