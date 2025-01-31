import styled from 'styled-components';

export const HeaderContainer = styled.div`
    width: calc(100% - 40px);
    height: 24px;
    padding: 44px 20px 0;
    display: flex;
    align-items: center;
    position: relative; 
    background-color: white;
`;

export const BackButton = styled.button`
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 20px;
    cursor: pointer;

    img {
        width: 24px;
        height: 24px;
    }
`;

export const Title = styled.h1`
    font-family: 'Pretendard', Arial, sans-serif;
    font-size: 22px;
    font-weight: 700;
    line-height: 22px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin: 0 auto;
    flex: 1; 
`;
