import styled from 'styled-components';

export const PanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    padding-top: 16px;
    padding-bottom: 60px;
    overflow: auto;
`;

export const SectionTitle = styled.p`
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-top: 4px;
    margin-bottom: 20px;
    padding: 0;
`;

export const Item = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 16px;
    position: relative;
    height: 20px;
    line-height: 16px;
    padding: 0;
`;