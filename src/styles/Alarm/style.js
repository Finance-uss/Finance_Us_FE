import styled from "styled-components";
export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    height: auto;
    padding: 44px 20px 24px 20px; // top right bottom left
`;
export const AlarmContainer = styled.div`
    width: 100%;
    padding: 16px 0 0 0;
    border-radius: 10px;
    margin-bottom:20px;
    background:  #f7f7f7;
    box-shadow: 0px 0px 3px 0px #00000040;
    display: flex;
    flex-direction: column;
`;

export const Category = styled.div`
    font-size: 12px;
    font-weight: 600; 
    color: #000000;
    margin-left: 16px;
    margin-bottom:-6px;
`;

export const Content = styled.div`
    padding:16px;
    font-size: 14px;  
`;

export const TitleText = styled.div`
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: #000000;
    margin-bottom: 6px;
`;
export const ContentText = styled.div`
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    color:#5c5c5c;
`;