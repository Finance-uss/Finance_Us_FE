import styled from 'styled-components';

export const ChartContainer = styled.div`
  margin-top: 40px;
  background-color: #F7F7F7; 
  border-radius: 10px; 
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25); 
  padding: 20px; 
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%; 
  height: 263px;
`;

export const DetailsHeader = styled.div` 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const DetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
`;

export const DetailsItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 6px 0; 
  text-align: center; 
  color: #5C5C5C;
`;

export const DetailsAmount = styled.span`
  color: #5C5C5C;
`;

export const Separator = styled.hr`
  border: 0.5px solid #D7D8D9;
  margin: 16px 0; // 간격 조정
`;

export const DetailContainer = styled.div`
  overflow-y: auto; 
  margin-bottom: 30px;
`;
