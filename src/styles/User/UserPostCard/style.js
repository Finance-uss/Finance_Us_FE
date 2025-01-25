import styled from "styled-components";

export const CardContainer = styled.div`
  width: 353px;
  height: 146px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0px 0px 2px 0px #00000040;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  flex: 1;
  padding: 0 14px; 
  display: flex;
  flex-direction: column;
`;

export const Category = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--Primary-color, #142755);
`;

export const Title = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000000;
  margin-top: 10px; 
`;

export const Preview = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px; 
  letter-spacing: 0.01em;
  color: #000000;
  white-space: pre-wrap;
  display: -webkit-box; 
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; 
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 14px; 
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-right: 16px;
`;

export const StatIcon = styled.img`
  width: 12px;
  height: 12px;
`;

export const StatText = styled.span`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #b4b4b4;
`;

export const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 14px;
  margin-left: 14px; 
`;

export const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0s; 
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 30px; 
`;
