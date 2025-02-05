import styled from 'styled-components';

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    background: #F7F7F7;
    width: calc(100% - 32px);
    height: auto;
    padding: 16px;
    border-radius: 5px;
    gap: 20px;
    box-shadow: 0px 0px 3px 0px #00000040;
`;

export const Title = styled.div`
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    color: #142755;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: calc(100% - 32px);
    height: 50px;
    padding: 20px 16px; // 상하 20px, 좌우 16px
    background: #F7F7F7;
    border: none;
    transform: translateX(${(props) => props.translateX}px);
    transition: ${(props) => (props.isSwiping ? 'none' : 'transform 0.3s ease')};
`;

export const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 16px;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 66px);
`;

export const Subtitle = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #818C99;
`;

export const SubInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 38px;
`;

export const Price = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #818C99;
`;

export const MoreButton = styled.button`
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    cursor: pointer;
    color: #B4B4B4;
    background: transparent;
    border: none;
`;

