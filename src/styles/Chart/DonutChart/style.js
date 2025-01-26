import styled from 'styled-components';

export const ChartContainer = styled.div`
  margin: 40px 0;
  background-color: #F7F7F7; 
  border-radius: 10px; 
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25); 
  padding: 20px; 
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 195px;
  margin-bottom: 20px; 
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
  margin-bottom: 16px; 
`;

export const LegendColorBox = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-left: 30px;
  margin-right: 5px;
`;
