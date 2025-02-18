import styled from 'styled-components';

// 버튼 전체
export const ButtonWrapper = styled.button`
  width: 100%;
  height: 29px;
  border-radius: 5px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);

  &:hover {
    opacity: 0.9;
  }
`;

// 텍스트 스타일
export const Text = styled.span`
  font-size: 16px;
  color: #5c5c5c;
  text-align: center;
  font-family: 'Pretendard', Arial, sans-serif;
`;

// 엑스 버튼 스타일
export const CloseIcon = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 8.5px;
  left: calc(100% - 18px);
  cursor: pointer;
  pointer-events: auto;
`;
