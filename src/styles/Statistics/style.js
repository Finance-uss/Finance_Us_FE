import styled from 'styled-components';

// 전체 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  box-sizing: border-box; 
  padding: 26px;
`;

export const TopSection = styled.div`
  margin: 0px; // TopSection과 NavBar 사이의 간격 조정
`;

export const NavBarContainer = styled.div`
  margin-top: 40px; // 차트와의 간격 조정
  position: relative; // NavBar가 흐름에 따라 배치되도록 설정
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProgressContainer = styled.div`
  margin-top: 20px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ $percentage }) => $percentage}%;
    background-color: #3f51b5;
  }
`;

export const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 16px;
`;
