import styled from 'styled-components';

// 전체 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 26px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%; 
  margin-bottom: 0px;
`;

export const TotalProgressContainer = styled.div`
  margin: 20px 0;
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

export const Icon = styled.img`
  width: 24px; 
  height: 24px;
  margin-left: 16px; 
  cursor: pointer; 
`;

export const CategoryProgressContainer = styled.div`
  margin: 20px 0;
`;

export const CategoryBar = styled.div`
  margin: 10px 0;
`;

export const CategoryLabel = styled.span`
  margin-right: 10px;
`;

export const CategoryChartContainer = styled.div`
  margin: 20px 0;
  text-align: center;
`;

export const CategoryChart = styled.div`
  width: 100%;
  height: 130px; 
  background-color: #f0f0f0; 
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

export const LegendColorBox = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 3px;
  margin-right: 5px;
`;
