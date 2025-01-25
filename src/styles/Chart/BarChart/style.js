import styled from 'styled-components';

export const ChartContainer = styled.div`
  margin: 40px 0;
  background-color: #F7F7F7; 
  border-radius: 10px; // 모서리 둥글게
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25); // 그림자 추가
  padding: 20px; // 내부 여백 추가
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%; // 100%로 설정하여 부모 컨테이너에 맞게 크기 조정
  height: 195px;
`;
