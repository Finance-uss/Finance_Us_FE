import styled from "styled-components";

export const CardContainer = styled.div`
  width:100%;
  // max-width: 353px;
  height: 146px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0px 0px 2px 0px #00000040;
  box-sizing: border-box;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  width:212px;
  height:116px;
  align-items: center;
  padding: 13px 0 17px 14px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: auto; 
`;

export const Category = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #142755;
    margin-bottom: 10px;
`;

export const Thumbnail = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 27px;
`;


export const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #000000;
`;

export const Preview = styled.p`
    width:211px;
  font-size: 16px;
  color: #000000;
  margin: 0 0 13px;
  line-height: 1.4;
   white-space: pre-wrap;  
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  margin-right: 17px;
`;

export const StatIcon = styled.img`
  width: 11px;
  height: 11px;
  margin-right: 1px;
`;

export const StatText = styled.span`
  font-size: 12px;
  color: #b4b4b4;
`;
