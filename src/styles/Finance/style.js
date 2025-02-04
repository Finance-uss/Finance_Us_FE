import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    height: auto;
    padding: 44px 20px 24px 20px; // top right bottom left
    gap: 20px;
`;

export const Today = styled.div`
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
`;