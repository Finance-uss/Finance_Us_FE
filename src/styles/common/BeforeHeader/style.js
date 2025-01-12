import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px; 
  cursor: pointer; 
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
  text-align: center;
  color: #000000; 
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%); 
`;