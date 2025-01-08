import styled from 'styled-components';

// 버튼 전체
export const ButtonWrapper = styled.button`
  width: 107px;
  height: 29px;
  border-radius: 5px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  cursor: pointer;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);

  &:hover {
    opacity: 0.9;
  }
`;

// 더하기 버튼 스타일
export const PlusIcon = styled.img`
  width: 10.94px;
  height: 10.94px;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
`;
