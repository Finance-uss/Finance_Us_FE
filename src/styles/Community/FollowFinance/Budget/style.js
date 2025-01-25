import styled from 'styled-components';

export const Container = styled.div`
    // padding: 20px;
    margin-bottom: 20px;
`;

export const Bar = styled.div`
    //   max-width: 353px;
    width:100%;
    height: 20px;
    background-color: #e9ecf1;
    border-radius: 4px;
    position: relative;
`;

export const BarText = styled.div`
    position: absolute;
    margin-top:30px;
    top: -56px; 
    left: ${(props) => `calc(${props.percentage}% - 10px)`}; 
    color:#818C99;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.09px;

`;

export const Fill = styled.div`
    width: ${(props) => props.percentage || 0}%;
    height: 100%;
    background-color: #142755;
    border-radius: 4px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:30px;
    margin-bottom: 40px;
    position: relative;
`;

export const Text = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
`;

export const ProgressContainer = styled.div`
    display: flex;
    align-items: baseline;
`;

export const Percentage = styled.span`
    font-size: 22px;
    font-weight: 700;
    margin-right: 5px;
`;

export const Consume = styled.span`
    font-size: 16px;
    font-weight: 600;
`;
export const Line = styled.div`
    width: 100%;
    margin-top: 40px;
    margin-bottom:20px;
    height: 0.5px;
    background-color: #D7D8D9;
`;