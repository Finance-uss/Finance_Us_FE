import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  width:100%;
  margin-top:30px;
  margin-bottom:10px;
  box-sizing: border-box;
  gap: 10px;
`;

export const Button = styled.button`
  width: 77px;
  height: 22px;
  border-radius: 5px;
  background-color: ${({ isClick }) => (isClick ? '#142755' : '#f7f7f7')};
  color: ${({ isClick }) => (isClick ? '#ffffff' : '#b4b4b4')};
  font-size: 14px;
  cursor: pointer;
  border: none; 
  display: flex;
  align-items: center;
  justify-content: center;

  white-space: nowrap;
`;