import styled from 'styled-components';

export const Container = styled.div`
    width:100%;
    max-height: 297.6px;
    margin-bottom:20px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 9.6px;
`;
export const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom:6px;
`;

export const Title = styled.div`
    position:relative;
    font-size: 18px; 
    font-weight: 500;  
    color: #000000;
`;

export const Satisfaction = styled.div`
    font-size: 18px;
    color: #000000;
`;
export const BottomWrapper = styled.div`

`;
export const Preview = styled.div`
    // max-height:40px;
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    margin-bottom: 1px;
    white-space: pre-wrap;
`;

export const Emoji = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;

    span {
        font-size: 16px; 
        line-height:16px;
        display: flex;
        align-items: center;
        margin-left:16px;
        cursor:pointer;
    }
`;
