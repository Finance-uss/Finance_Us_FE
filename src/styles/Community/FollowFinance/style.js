import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    height: auto;
    padding: 44px 20px 24px 20px; // top right bottom left
    margin-bottom: 77px;
`;

export const CheerupMessage = styled.div`
    color:#142755;
    margin-top:35px;
`;

export const FirstMessage = styled.div`
    font-size: 22px;
    font-weight: 700;
    line-height: 33px;
`;

export const SecondMessage = styled.div`
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
`;

export const Line = styled.div`
    width: 100%;
    margin-top: 24px;
    margin-bottom:30px;
    height: 0.5px;
    background-color: #D7D8D9;
`;