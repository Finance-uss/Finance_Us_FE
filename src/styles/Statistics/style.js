import styled from 'styled-components';

// 전체 컨테이너
export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    height: auto;
    padding: 44px 20px 24px 20px; // top right bottom left;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  margin-bottom: 20px; 
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%; 
  gap: 8px;
  margin-bottom: 0px;
`;

export const TotalProgressContainer = styled.div`
  margin-bottom: 40px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #E9ECF1;
  border-radius: 2px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ $percentage }) => $percentage}%;
    background-color: #142755;
  }
`;

export const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 16px;
`;

export const Icon = styled.img`
  height: 24px;
  margin-left: 16px; 
  cursor: pointer; 
`;

export const CategoryProgressContainer = styled.div`
  margin: 20px 0;
`;

export const CategoryBar = styled.div`
  margin: 20px 0;
`;

export const CategoryLabel = styled.span`
  margin-right: 10px;
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d4d4d4;
  margin: 10px 0; // 위아래 여백
`;

export const Title = styled.h3`
  margin: 20px 0; // 제목 위아래 여백
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
